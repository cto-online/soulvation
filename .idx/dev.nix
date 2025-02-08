# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
    pkgs.sudo
    pkgs.unzip
    pkgs.docker-compose
  ];
  services.docker.enable = true;
  # Sets environment variables in the workspace
  env = {
    VITE_PORT = "4000";
    VITE_HMR_PORT = "4001";
  };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "vue.volar"
    ];
    workspace = {
      # Runs when a workspace is first created with this `dev.nix` file
      onCreate = {
        npm-install = "npm ci --no-audit --prefer-offline --no-progress --timing";
        # Open editors for the following files by default, if they exist:
        default.openFiles = [ "src/App.vue" ];
      };
      # To run something each time the workspace is (re)started, use the `onStart` hook
      onStart = {
        start-docker = "sudo service docker start";
      };
    };
    # Enable previews and customize configuration
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev" "--" "--port" "4000" "--host" "0.0.0.0"];
          manager = "web";
          env = {
            VITE_PORT = "4000";
            VITE_HMR_PORT = "4001";
          };
        };
      };
    };
  };
}
