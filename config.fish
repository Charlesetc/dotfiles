set -x GOPATH ~/.gvm/pkgsets/go1.4/global/
set -x GOBIN ~/.gvm/pkgsets/go1.4/global/bin
set --global --export LANG en_US.UTF-8
xrdb -merge ~/.Xresources

rvm use default >/dev/null
status --is-login; and status --is-interactive; and exec byobu-launcher