# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH
export PATH=$HOME/.bin:$PATH
export GOPATH=~/.go
#
export HOST='{pixel}'

PATH=$PATH:/usr/lib/postgresql/9.6/bin

. ~/.profile

# Path to your oh-my-zsh installation.
  export ZSH=/home/charles/.oh-my-zsh

export LD_LIBRARY_PATH=/usr/local/lib:"$LD_LIBRARY_PATH"

# Set name of the theme to load. Optionally, if you set this to "random"
# it'll load a random theme each time that oh-my-zsh is loaded.
# See https://github.com/robbyrussell/oh-my-zsh/wiki/Themes
ZSH_THEME="steeef"

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion. Case
# sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment the following line to disable bi-weekly auto-update checks.
DISABLE_AUTO_UPDATE="true"


Blue="34"
Green="32"
LightGreen="1;32"
Cyan="36"
Red="31"
Purple="35"
Brown="33"
Yellow="1;33"
white="1;37"
LightGrey="0;37"
Black="30"
DarkGrey="1;30"

LS_COLORS=$LS_COLORS:"di=$LightGrey:"
LS_COLORS=$LS_COLORS:"ex=$Cyan:"
LS_COLORS=$LS_COLORS:"ln=$LightGreen:"
export LS_COLORS

# Uncomment the following line to change how often to auto-update (in days).
# export UPDATE_ZSH_DAYS=103

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLOR="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# The optional three formats: "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
# plugins=(git)

source $ZSH/oh-my-zsh.sh

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# ssh
# export SSH_KEY_PATH="~/.ssh/dsa_id"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"
# Path to your oh-my-zsh installation.

#
#set history size
#save history after logout
export SAVEHIST=10000
#history file
export HISTFILE=~/.zhistory
setopt nologin
#append into history file
setopt INC_APPEND_HISTORY
#save only one command if 2 common are same and consistent
setopt HIST_IGNORE_DUPS
#add timestamp for each entry
setopt EXTENDED_HISTORY

# Set name of the theme to load.
# Look in ~/.oh-my-zsh/themes/
# Optionally, if you set this to "random", it'll load a random theme each
# time that oh-my-zsh is loaded.
export FZF_DEFAULT_COMMAND='ag -g ""'
# export LESS_TERMCAP_mb=$(tput bold; tput setaf 2) # green
# export LESS_TERMCAP_md=$(tput bold; tput setaf 6) # cyan
# export LESS_TERMCAP_me=$(tput sgr0)
# export LESS_TERMCAP_so=$(tput bold; tput setaf 3; tput setab 4) # yellow on blue
# export LESS_TERMCAP_se=$(tput rmso; tput sgr0)
# export LESS_TERMCAP_us=$(tput smul; tput bold; tput setaf 0) # black
# export LESS_TERMCAP_ue=$(tput rmul; tput sgr0)
# export LESS_TERMCAP_mr=$(tput rev)
# export LESS_TERMCAP_mh=$(tput dim)
# export LESS_TERMCAP_ZN=$(tput ssubm)
# export LESS_TERMCAP_ZV=$(tput rsubm)
# export LESS_TERMCAP_ZO=$(tput ssupm)
# export LESS_TERMCAP_ZW=$(tput rsupm)

# Uncomment the following line to use case-sensitive completion.
CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion. Case
# sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment the following line to disable bi-weekly auto-update checks.
# DISABLE_AUTO_UPDATE="true"

# Uncomment the following line to change how often to auto-update (in days).
# export UPDATE_ZSH_DAYS=13

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# The optional three formats: "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
# plugins=(git)


# User configuration
# export MANPATH="/usr/local/man:$MANPATH"


# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# ssh
# export SSH_KEY_PATH="~/.ssh/dsa_id"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias vimomz="vim ~/.oh-my-zsh"

function vim() {
  if [ "$#" -eq 0 ]
  then
    FILE=`fzf`
    if [ -z "$FILE" ]
    then
      echo ""
    else
      print -s vim $FILE
      /usr/bin/vim $FILE
    fi
  else
    /usr/bin/vim $@
  fi
}

alias vi=vim
alias l=ls
alias c=cd
alias tor='~/tor/Browser/start-tor-browser'
alias gits='git s'
alias gitl='git l'
alias .env='. env/bin/activate'
alias .z='. ~/.zshrc'
alias unquote='ruby -e "eval (\"puts \" + gets)"'

alias tmux="tmux -2"
alias s="ls"
alias jl="jq . | less"

alias lynx="lynx --accept_all_cookies"

export LESS='-R'
export LESSOPEN='|~/.lessfilter %s'

export VIRTUAL_ENV_DISABLE_PROMPT=1

# B careful

alias ys='yaourt --noconfirm -S'
alias yr='yaourt -R'
alias vundle='vim +PluginInstall +qall'
alias vimz='vim ~/.zshrc'
alias vimzh='vim ~/.zsh_history'
alias vimv='vim ~/.vimrc'
alias vimd='/usr/bin/vim'
alias sl=ls
alias net='sudo netctl start HOME'
alias wifi='sudo wifi-menu'


# setopt no_share_history

# OPAM configuration
. /home/charles/.opam/opam-init/init.zsh > /dev/null 2> /dev/null || true


# setxkbmap us -variant colemak

alias execc='eval "$(cat /tmp/file)"'
alias copyc='cat /tmp/file | xclip'
alias catc='cat /tmp/file'

function chpwd() {
  echo "$(pwd)" > ~/.cdsavefile
}

setopt autocd

function mux() {
  if [ -z "$1" ]
  then
    tmux a
  elif [ "$1" = "n" ]
  then
    tmux new -s $2
  elif [ "$1" = "r" ]
  then
    tmux rename-session $2
  elif [ "$1" = "a" ]
  then
    tmux attach -t $2
  elif [ "$1" = "l" ]
  then
    tmux list-sessions
  elif [ "$1" = "k" ]
  then
    tmux kill-session -t $2
  elif [ "$1" = "d" ]
  then
    tmux detach
  else
    echo usage: mux [nralkd]
  fi
}

alias task='vim ~/.tasks'
alias vimx='vim ~/.xinitrc'

alias ghci='stack ghci'

# export PROMPT='%c <> '
# export RPROMPT=''

alias spacemacs='bash -c "emacs &"'
alias w='sudo wifi-menu'
alias static='ruby -run -e httpd . -p 9000'

cd $(cat ~/.cdsavefile 2> /dev/null)
# export LS_COLORS=
bindkey -e
alias vimt='vim ~/.tmux.conf'

[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

function made() {
  cd $1
  shift
  make $@
  cd -
}

function document() {
  pandoc --reference-docx=.reference.docx `basename $1 .md`.md -o `basename $1 .md`.docx
}

alias ed="rlwrap ed -p'🌂  '"

alias wim='vim -c Write'

function man() {
    LESS_TERMCAP_md=$'\e[01;31m' \
    LESS_TERMCAP_me=$'\e[0m' \
    LESS_TERMCAP_se=$'\e[0m' \
    LESS_TERMCAP_so=$'\e[01;44;33m' \
    LESS_TERMCAP_ue=$'\e[0m' \
    LESS_TERMCAP_us=$'\e[01;32m' \
    command man "$@"
}
export LESS="--RAW-CONTROL-CHARS"

alias focus='focuswriter'

# Use colors for less, man, etc.
# source ~/.LESS_TERMCAP

export PATH="$PATH:$HOME/.gem/ruby/2.3.0/bin" # Add RVM to PATH for scripting

alias smount='sudo mount -o gid=charles,fmask=113,umask=000,dmask=002'
alias xcopy='xclip -selection clipboard'

alias python='python3'
alias gc='google-chrome-stable --force-device-scale-factor=2'
# eval $(opam config env)
#
