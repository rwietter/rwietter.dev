{
  description = "Next.js devShell with pnpm";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        nodejs = pkgs.nodejs_latest;
      in with pkgs; {
        devShells.default = mkShell {
          name = "nextjs-dev";
          buildInputs = [ nodejs nodejs.pkgs.pnpm ];
          shellHook = ''
            if [ ! -f "package.json" ]; then
              echo "Creating a new Next.js project..."
              npx create-next-app@latest .
            elif [ ! -d ".next" ];then
              echo "Installing dependencies..."
              pnpm install
            fi


            echo "Node Environment ready! 🚀"
            echo "Node $(node -v)"
            echo "pnpm $(pnpm -v)"
        '';
      };
    }
  );
}
