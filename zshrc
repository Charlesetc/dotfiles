# Lines configured by zsh-newuser-install
HISTFILE=~/.histfile
HISTSIZE=1000
SAVEHIST=1000
bindkey -e
# End of lines configured by zsh-newuser-install
# The following lines were added by compinstall
zstyle :compinstall filename '/home/charles/.zshrc'

autoload -Uz compinit
compinit
# End of lines added by compinstall

autoload -U promptinit
promptinit
prompt walters # this gives you a
prompt off

alias vi=vim
alias l=ls

# This is for setting the key-repeat
xfconf-query -c keyboards -p /Default/KeyRepeat/Rate -s 150 > /dev/null 2> /dev/null

export PATH="$PATH:$HOME/.rvm/bin" # Add RVM to PATH for scripting
export PATH="$HOME/.rbenv/bin:$PATH"
export RBENV_VERSION=2.2.1
eval "$(rbenv init -)"

function cd() {
    # emulate -LR zsh
    builtin cd $@ &&
    ls
}
