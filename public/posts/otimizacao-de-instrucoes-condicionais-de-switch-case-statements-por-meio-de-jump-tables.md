---
title: Otimização de instruções condicionais Switch-Case Statements por meio de Jump Tables
description: Este artigo examina aspectos teóricos e empíricos, destacando casos de uso e desafios encontrados na aplicação de jump tables e branchs em diferentes contextos para otimização de instruções condicionais em switch-case statements e compiladores.
slug: otimizacao-de-instrucoes-condicionais-de-switch-case-statements-por-meio-de-jump-tables
image: https://res.cloudinary.com/ddwnioveu/image/upload/v1720299096/fgqw1b2j7dncrztplfbn.jpg
alternativeText: galhos e branchs de árvores caídos submersos em um corpo de água calmo e escuro com folhagem verde exuberante ao fundo criam uma cena serena e pitoresca.
caption: Michael Held / Unsplash
publishedAt: 2024-07-05
updatedAt: 2024-07-06
category: coding
author: Maurício Witter
keywords: jump table, branch table, indexed table lookup, dispatch table, multiway branch, switch-case, select, match, optimization, compilers, gcc, assembly, c, rust, go, python, javascript, programming, computer science
---

# Introdução

A otimização de algoritmos e a busca por estruturas de dados eficientes, especialmente, quando se fala de compiladores, é algo primordial para tornar o código que escrevemos em alto nível de forma abstrata e, muitas vezes não performática, em performática a nível binário ou *bytecode*. Uma dessas otimizações é a manipulação de seleções condicionais, como as implementadas por meio de statements `switch/case`, `select` ou `match`; é aqui que jump tables entram em cena e brilham.

Uma jump table — ou também conhecida como dispatch table e por indexed table lookup —, é um forma de mapear valores discretos para funções ou ações correspondentes. Ao invés de depender de instruções condicionais, as jump tables proporcionam uma abordagem mais eficiente e modular para associar operações específicas a diferentes casos.

Neste artigo, exploraremos o que são jump tables, como elas funcionam e por que são valiosas para a otimização de algoritmos. Vamos analisar exemplos práticos de implementação, discutir as vantagens e desvantagens associadas a essa técnica e considerar casos de uso para elas.

---

Direto ao ponto, vamos começar por uma instrução `switch/case` para compreender porquê jump tables são aplicadas.

No código mais simples possível em **C**, criamos um `switch/case`; o `scanf` permite ler o *prompt* e atribuir o valor por referência para a variável `choice`. A seguir, nosso `switch` vai, dentre os casos, condicionalmente verificar qual `case` é igual a variável `choice` e executar o bloco de código que for verdadeiro e parar por conta do `break`; em último caso se não corresponder a nenhum `case`, irá bater no `default` e executar as instruções e parar.

```c
int main() {
    int choice;
    printf("Enter a choice (1-3): ");
    scanf("%d", &choice);

    switch (choice) {
        case 1:
            printf("Executing Case 1\n");
            break;
        case 2:
            printf("Executing Case 2\n");
            break;
        case 3:
            printf("Executing Case 3\n");
            break;
        default:
            printf("Invalid choice\n");
            break;
    }
    return 0;
}
```

Então você pode estar se perguntando, porque isso tem problemas de desempenho ? Não é algo constante ?

De fato, é uma operação constante mas que depende do número de `cases`, que é conhecido em tempo de compilação. Mas o problema entra quando temos muitos `cases` — perceba que cada condição do `switch` vai ser avaliada — até encontrar um `break`. Não é algo que produziria um estrangulamento de desempenho, mas pode tomar alguns ciclos de CPU dependendo do contexto.

Suponha que, **hipoteticamente**, que exista um `switch` com $15$ `cases` e ele é executado **dentro de um loop**. Na notação assintótica do $BigO$, temos o *loop* como sendo $O(n)$ e $O(15)$ `cases` que nos dá $O(n*15)$ **no pior caso**; normalmente descartaríamos o 15 pois é um termo constante, mas para esse exemplo vamos considerar.

```c
int main() {
    for (int i = 0; i < 3; i++) {
        switch (i) {
        case 0:
            printf("Executing Case 1\n");
            break;
        case 1:
            printf("Executing Case 2\n");
            break;
        //...
     }
   }
  return 0;
}
```

Mas e se pudêssemos tornar isso $O(n*1)$ não seria melhor ? Imagine que esse loop fosse até $200$, então teríamos $O(200*15)$ o que nos daria complexidade de $O(3000)$ operações **no pior caso**, ou seja, onde **todos os 15 cases são condicionados**.

Agora, se conseguíssemos otimizar o código de tal forma que a quantidade de `cases` seja reduzida para $1$, a complexidade se torna $O(n * 1)$, o que é efetivamente $O(n)$ ? Pois bem, é aí que entra a jump table.

# Jump Tables

Jump tables utilizam o valor dos dados ou uma derivada calculada como o índice de um array. Essa técnica pode ser mais eficiente do que usar uma instruções `switch`, pois evita ramificações (branches).

---

Não quero entrar muito em detalhes neste artigo para não ficar extenso, mas em suma, as CPUs modernas ainda não são tão eficientes em lidar com desvios condicionais. Acontece que, as CPUs processam instruções em pipelines e quanto mais cheio esse pipeline fica, mais eficiente é o uso da CPU.

Ocorre que, =red=o desvio condicional torna-se um desafio para manter o pipeline cheio, uma que vez que, quando uma instrução de branch é encontrada, a CPU não sabe antecipadamente qual caminho seguir==. Dependendo da condição associada ao branch, a CPU deve decidir se deve continuar com as instruções subsequentes no fluxo atual ou se deve pular para um novo fluxo de instruções. Atualmente existem algoritmos de **Branch Predictor** para pré-buscar essas instruções e colocar antecipadamente no pipeline, mas ainda assim não é obtido a melhor eficiência. E isso piora quando você tem branchs aninhadas, pois as branchs internas sequer são conhecidas para que se possa pré-buscar as instruções.

E além disso, se o algoritmo faz uma predição incorreta sobre qual caminho um desvio condicional (branch) tomará, será necssário descartar as instruções especulativas que foram carregadas no pipeline (**branch misprediction**). Então, a CPU deve buscar as instruções corretas e reiniciar a execução a partir do ponto do branch, causando uma penalidade de desempenho devido ao pipeline ter que ser "limpo" (flush).

Outro problema das branchs é que elas podem causar **cache misses**. O cache miss ocorre quando os dados ou instruções requisitados não estão presentes nos caches L1, L2, L3 e afim, forçando o sistema a buscar os dados na memória principal, que é mais lenta a adiciona maior latência. 

Por exemplo, a condicional no código abaixo normalmente é mais lento do que simplesmente `value = new_val` — não porque o código é maior — mas porque a variável poderia estar no cache e o desvio condicional pode gerar um branch misprediction.

```js
if (value !== new_val) {
  value = new_val
}
```

Em suma, você acaba perdendo alguns ciclos de CPU por conta dessa ineficiência que as branchs criam. Por isso, os compiladores dão tanta enfasê em otimizar essas instruções condicionais.

---

Voltando ao tópico principal, de que forma podemos tornar uma sequência de condicionais em um acesso direto ? Precisamos de uma estrutura de dados que nos de acesso direto ao valor ou endereço; para isso temos os *arrays* e as *dictionaries*, podemos acessar o *array* pelo *index* ou em um *dictionary* por sua *key*.

> Array: um conjunto de itens acessíveis aleatoriamente por números inteiros, o índice.

> Dictionary: um tipo de dados abstrato que armazena itens ou valores. Um valor é acessado por uma chave associada. As operações básicas são new, insert, find e delete.

Os dicionários utilizam funções hash, que em casos de colisão de hash vem a ter uma complexidade $O(n)$. Você encontrará exemplos na internet de jump tables com *dicionaries*, mas usualmente é implementada por compiladores por meio de arrays.

## Condições para uso de Jump Table (gcc)

O Intervalo Contíguo de Casos: se os valores dos ==casos são contíguos ou próximos==, é mais eficiente usar uma jump table.

O Número de Casos: se o número de casos é suficiente para justificar a tabela, normalmente ==5 ou mais casos contíguos==.

Case labels: os rótulos dos casos devem ser constantes — não variáveis ou strings — ==(1..n, a..z, Enum)==.

## Multiway branch

Há muita confusão em relação a nomeclaturas e definições. Eu prefiro entender por **jump table como uma otimização de branchs por compiladores** e **indexed table lookup como uma estrutura de dados**. Mas, em geral, são usados de forma intercambiável. E ainda há quem chame de **dispatch table**, **branch table** ou ainda **multiway branch**.

Se o compilador da sua linguagem não faz tal otimização, você mesmo pode implementar um "switch-case por indexação", mas isso não é exatamente como o compilador faz para criar a jump table, mas também é eficiente.

Inicialmente temos um exemplo clássico de um `switch-case` que todo mundo faz quando está aprendendo a programar, uma simples forma de calcular aritmética básica entre dois números, onde cada `case` possui um operador aritmético ou uma opção para um menu.

```c
int main() {
  int operation, num1, num2;

  printf("Enter an operation \n1) sum\n2) multiply\n3) subtract\n4) divide\n");
  printf("Choose an operation: ");
  scanf("%d", &operation);

  printf("Enter two numbers: ");
  scanf("%d %d", &num1, &num2);

  switch (operation) {
  case 1:
    printf("%d + %d = %d\n", num1, num2, num1 + num2);
    break;

  case 2:
    printf("%d * %d = %d\n", num1, num2, num1 * num2);
    break;

  case 3:
    printf("%d - %d = %d\n", num1, num2, num1 - num2);
    break;

  case 4:
    printf("%d / %d = %d\n", num1, num2, num1 / num2);
    break;

  default:
    printf("Invalid operation\n");
    break;
  }

  return 0;
}
```

A primeira coisa a se fazer é separar nossas expressões em funções, pois usaremos elas como índices da nossa tabela para acesso direto.

```c
void sum(int a, int b);
void subtract(int a, int b);
void multiply(int a, int b);
void divide(int a, int b);

int main() {
  int operation, num1, num2;

  printf("Enter an operation \n1) sum\n2) multiply\n3) subtract\n4) divide\n");
  printf("Choose an operation: ");
  scanf("%d", &operation);

  printf("Enter two numbers: ");
  scanf("%d %d", &num1, &num2);

  switch (operation) {
  case 1:
    sum(num1, num2);
    break;

  case 2:
    multiply(num1, num2);
    break;

  case 3:
    subtract(num1, num2);
    break;

  case 4:
    divide(num1, num2);
    break;

  case 5:
    // ...
    break;

  default:
    printf("Invalid operation\n");
    break;
  }

  return 0;
}
```

Feito isso, agora definitivamente vamos criar a tabela. Definimos um array de ponteiros porque queremos armazenar endereços dessas funções. Nossas funções são do tipo `void` e a assinatura possui dois parâmetros do tipo `int`, ou seja, `void (*table[])(int, int)`.

Atribuímos tabela um array estático com cada função que criamos e em seguida acessamos o endereço da função no array pelo `index`, então só precisamos invocar essa referência passando os argumentos `table[operation](num1, num2)`. Dessa forma, a função será executada no melhor e pior caso com apenas uma operação $O(1)$.

```c
void sum(int a, int b);
void subtract(int a, int b);
void multiply(int a, int b);
void divide(int a, int b);

void sum(int a, int b) {
  printf("%d + %d = %d\n", a, b, a + b);
}

void subtract(int a, int b) {
  printf("%d - %d = %d\n", a, b, a - b);
}

void multiply(int a, int b) {
  printf("%d * %d = %d\n", a, b, a * b);
}

void divide(int a, int b) {
  printf("%d / %d = %d\n", a, b, a / b);
}

int main() {
  int operation, num1, num2;

  printf("Enter an operation \n1) sum\n2) multiply\n3) subtract\n4) divide\n");
  printf("Choose an operation: ");
  scanf("%d", &operation);

  printf("Enter two numbers: ");
  scanf("%d %d", &num1, &num2);

  void (*table[])(int, int) = {sum, multiply, subtract, divide};
  table[operation](num1, num2);

  return 0;
}
```

Caso queira compilar o código, bem como obter o assembly dele, use as seguintes flags.

```bash
gcc -O2 -S -o main.s main.c # assembly
gcc source.c -O2  -S -o/dev/stdout # assembly
gcc -O2 -o main main.c # bin
```

# Compiladores (gcc)

O que os compiladores fazem para otimizar um `switch statement` é usar, basicamente, matemática. Primeiramente, ele precisa saber onde fica localizado cada `case`, ele precisa do valor mínimo e máximo dos `cases`. Por exemplo, num `switch` cujos `cases` vão de 10 a 15, o valor mínimo é o 10 e o máximo é o 15.

No código assembly abaixo, a instrução `subl` vai subtrair o valor mínimo do argumento $(min\_case - argument)$, uma vez que os valores do case serão normalizados.

```nasm
.LFB18:
	subl	$10, %edi
```

O passo seguinte é normalizar estes intervalos para ficar mais fácil e barato, isso pode ser feito de tal forma

$$
index = value - min\_case
$$

E teremos os índices dispostos da seguinte maneira

```md
5 = 15-10
4 = 14-10
3 = 13-10
2 = 12-10
1 = 11-10
0 = 10-10
```

Para garantir que o valor normalizado está dentro dos limites, uma comparação é feita. Se a comparação falhar, o fluxo é direcionado para o caso padrão (default). Por exemplo $index \leq (max\_case - min\_case)$.

A instrução `cmpl` faz essa verificação e a instrução `ja` salta para o `default` se tal verificação estiver fora do intervalo.

```nasm
.LFB18:
	subl	$10, %edi
	cmpl	$5, %edi
	ja    .Ldefault
```

O rótulo `.L12` define a jump table, que é um array onde cada entrada contém o deslocamento (offset) relativo ao início da tabela.

```nasm
.L12:
  .long .L17-.L12  # Offset para case10
  .long .L16-.L12  # Offset para case11
  .long .L15-.L12  # Offset para case12
  .long .L14-.L12  # Offset para case13
  .long .L13-.L12  # Offset para case14
  .long .L11-.L12  # Offset para case15
```

Para calcular o endereço final do código do caso correspondente, somamos o deslocamento com o endereço base da tabela. Por exemplo $jump\_address = base\_address + offsets[index]$.

A instrução `leaq` (**Load Effective Address (Quad)**), carrega o endereço efetivo do rótulo `.L12` (jump table) no registrador `%rdx`.

A instrução `movslq` (**Move and Sign-Extend Long to Quadword**), calcula o endereço do deslocamento correspondente na jump table e carrega esse deslocamento, com extensão de sinal, no registrador `%rax`. Aqui, o `rdx` contém o endereço base da `.L12`, `rdi` contém o índice do case normalizado ou seja $value - min\_case$ e o 4 é o tamanho de cada deslocamento na tabela (4 bytes).

A instrução `addq` (**Add Quadword**), adiciona o deslocamento carregado ao endereço base de `.L12` da jump talbe, resultando no endereço final do código do caso específico. Os registradores, `%rdx` contém o endereço base da jump table e `%rax` contém o deslocamento carregado da jump table.

Po fim, a instrução `jmp` (**Jump**) desvia incondicionalmente para o endereço contido em `%rax`, que agora é o endereço do código do caso correspondente do `switch`. O $(*)$, indica que o jump deve ser feito para o endereço armazenado no registrador `%rax`.

```nasm
.LFB18:
	# ...
	leaq	.L12(%rip), %rdx
	movslq	(%rdx,%rdi,4), %rax
	addq	%rdx, %rax       
	jmp	*%rax
```

## Conceitos similares

Existem alguns conceitos similares ao jump table, conhecidos como **Branch Table**. São similares, mas usam instruções `goto` para saltar para uma parte de código específica. Usa-se uma extensão do compilador GCC chamada "**Labels as Values**", um forma eficiente de *multi-way branching*.

> A multiway branching é uma técnica de programação importante que é frequentemente substituída por uma sequência ineficiente de testes if. Peter Naur escreveu-me recentemente que considera o uso de tabelas para controlar o fluxo do programa como uma ideia básica da ciência da computação que foi quase esquecida; mas ele espera que esteja pronto para ser redescoberto a qualquer momento. É a chave para a eficiência de todos os melhores compiladores que estudei.
> 
> — Donald Knuth, Structured Programming with go to Statements

Multiway branching é um construto da programação que permite que o **fluxo de controle de um programa seja direcionado para um dos vários resultados possíveis**, com base no valor de uma expressão, aquilo que conhecemos como **selection statements** — `switch`, `if`, `match` — mas que podemos substituir por técnicas mais eficientes como jump table.

```js
if(expression) {
	compound statement
} else if(expression) {
	compound statement
} else {
	compound statement
}
```

```rust
fn main() {
	let x = 2;
	match x {
		1 => println!("One"),
		2 => println!("Two"),
		3 => println!("Three"),
		_ => println!("Other"),
	}
}
```

No exemplo abaixo de um Assembly de um Microcontroller de 8-bit PIC, temos uma dessas instruções `goto` de um desvio incondicional (unconditional branch).

```nasm
 table
     goto    index_zero
     goto    index_one
     goto    index_two
     goto    index_three
```

Adicionalmente, nesse outro exemplo temos uma jump table com `goto`. Mas como você pode notar, temos alguns operadores diferentes; a expressão toda declara um array de ponteiros para **labels**; as labels `Case1`, `Case2` e `Case3` são endereços de pontos específicos no código (**labels**) e o operador `&&` é uma extensão do GCC que permite **obter o endereço de uma label**.

A expressão `goto *branchTable[index]` tem algumas particularidades que vem da extensão "**Computed Goto**". A primeira é que pode-se **colocar endereços de labels em void**, essencialmente, `void* label_address = &&Somelabel`. A segunda é **invocar goto em uma expressão variável** em vez de uma label conhecida em tempo de compilação, ou seja, `goto *branchTable[index]`; isso então irá saltar para esta label.

```c
void func3(void) { printf("three\n"); }
void func2(void) { printf("two\n"); }
void func1(void) { printf("one\n"); }

int main() {
    int index = 2;
    void (*branchTable[])(void) = {&&Case1, &&Case2, &&Case3};
    goto *branchTable[index];

Case1:
    func1();
    return 0;

Case2:
    func2();
    return 0;

Case3:
    func3();
    return 0;
}
```

 Use o seguinte comando para compilar caso queria.

```bash
gcc -std=c11 -o jump jump.c
```

# Conclusão

Jump table é uma técnica normalmente eficiente para otimizar instruções condicionais. Elas substituem instruções `switch/case` por uma tabela de índices que mapeia valores discretos para funções ou ações correspondentes. Isso permite que o compilador evite ramificações condicionais e, em vez disso, acesse diretamente o código associado a um valor específico.

Embora jump tables sejam uma técnica poderosa para otimizar instruções condicionais, elas têm algumas limitações. Por exemplo, os valores dos `cases` devem ser constantes, isto é, de $1-n$, de $a-z$. Não é possível fazer jump tables com strings ou funções, por exemplo. Mas você pode usar Indexed Table Lookup e Dispatch Tables para contornar. Além disso, há casos que jump tables podem ser ineficientes, como o caso de uso de [retpolines](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=86952) ou `cases` não contíguos.

O mais interessante disso, é entender como que as estruturas condicionais podem ser prejudiciais para o desempenho de um programa e como os compiladores modernos são capazes de otimizar essas instruções para melhorar a eficiência do código gerado.

Se você encontrar algum erro ou tiver alguma dúvida, sinta-se à vontade para me mandar uma mensagem no [Twitter](https://twitter.com/rwietter) ou abrir uma issue no [GitHub](https://github.com/rwietter/rwietter.dev/issues).

# Referências

- [GNU GCC - Dispatch-Tables](https://gcc.gnu.org/onlinedocs/gcc-13.2.0/gccint/Dispatch-Tables.html)
- [Function Dispatch Tables in C](https://blog.alicegoldfuss.com/function-dispatch-tables/)
- [Multiway branch](https://www.wikiwand.com/en/Multiway_branch)