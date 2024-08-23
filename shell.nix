{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-18_x
    pkgs.yarn
  ];

  shellHook = ''
    export NODE_ENV=development
  '';
}
