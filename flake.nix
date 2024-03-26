{
  description = ""; # FIXME: add a description
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable"; # TODO: pin
    flake-utils.url = "github:numtide/flake-utils"; # TODO: pin
  };

  outputs = { self, flake-utils, nixpkgs }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = (import nixpkgs) {
          inherit system;
        };
        # Generate a user-friendly version number.
        version = builtins.substring 0 8 self.lastModifiedDate;
        info = (builtins.fromJSON (builtins.readFile ./package.json));
      in
      {
        # For `nix develop`:
        devShell = pkgs.mkShell {
          # see https://github.com/NixOS/nixpkgs/issues/52447
          # see https://hoverbear.org/blog/rust-bindgen-in-nix/
          # see https://slightknack.dev/blog/nix-os-bindgen/
          # https://nixos.wiki/wiki/Rust#Installation_via_rustup
          buildInputs = with pkgs;
            [
              # JS tools
              nodejs_20
              zulu17 # <- openJDK
              
              # nix support
              nixpkgs-fmt
              nil

              # other
              bashInteractive
              git
              gitleaks
              lychee
              shellcheck
            ] ++ (with nodePackages; [pnpm]);

          # Environment variables
        };
      }
    );
}
