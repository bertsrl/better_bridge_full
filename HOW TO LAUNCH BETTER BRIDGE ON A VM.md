# HOW TO LAUNCH BETTER BRIDGE ON A VM (VPS)

1. Create a new VPS
   Keep in mind that Node and Docker are Memory Hungry, you need to make sure that you have 4 GB RAM on machine and 50 GB storage available. (1 vCPU is enough)
2. Install Docker
   Each docker installer has its own version of docker, so you need to install the correct version for your VPS.
   This is for Debian 12 (bookworm) arm64 arch:

```bash
mkdir docker-install
cd docker-install

curl -O https://download.docker.com/linux/debian/dists/bookworm/pool/stable/arm64/containerd.io_1.7.27-1_arm64.deb
curl -O https://download.docker.com/linux/debian/dists/bookworm/pool/stable/arm64/docker-ce_29.1.3-1~debian.12~bookworm_arm64.deb
curl -O https://download.docker.com/linux/debian/dists/bookworm/pool/stable/arm64/docker-ce-cli_29.1.3-1~debian.12~bookworm_arm64.deb
curl -O https://download.docker.com/linux/debian/dists/bookworm/pool/stable/arm64/docker-buildx-plugin_0.30.1-1~debian.12~bookworm_arm64.deb
curl -O https://download.docker.com/linux/debian/dists/bookworm/pool/stable/arm64/docker-compose-plugin_5.0.1-1~debian.12~bookworm_arm64.deb

sudo dpkg -i \
  containerd.io_1.7.27-1_arm64.deb \
  docker-ce-cli_29.1.3-1~debian.12~bookworm_arm64.deb \
  docker-ce_29.1.3-1~debian.12~bookworm_arm64.deb \
  docker-buildx-plugin_0.30.1-1~debian.12~bookworm_arm64.deb \
  docker-compose-plugin_5.0.1-1~debian.12~bookworm_arm64.deb

You'll also have to install install something like nftables libs but it will throw error and you need to run

sudo apt --fix-broken install -y
```

3. Clone the repository
   Install git using `sudo apt install git`
   Add github account info to git config by running:

```bash
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"
```

In order to clone the repo you'll need to get a SSH key assigned to your github account.
You'll create the key by running:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

You'll then add the key to your github account.

```bash
ssh-add ~/.ssh/id_ed25519
```

Print that ssh key by using cat to the public key:

```bash
cat ~/.ssh/id_ed25519.pub
```

You'll then clone the repo by running:

```bash
git clone git@github.com:better-bridge/better-bridge.git
cd better-bridge
```

4. Install NVM:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

You'll then install the correct version of Node.js by running:

```bash
nvm install 23
```

5. Install dependencies
   REMEMBER, you must go into the root dir, /backend and /frontend and run npm install in each directory and npm run build in each sub-directory.

```bash
cd backend && npm install && npm run build
cd frontend && npm install && npm run build
```

6. Launch the containers
   Go into the root dir and launch the containers by running:

```bash
docker compose build --no-cache && docker compose up -d
```
