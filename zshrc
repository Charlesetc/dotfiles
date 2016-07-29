# Path to your oh-my-zsh installation.

# Set name of the theme to load.
# Look in ~/.oh-my-zsh/themes/
# Optionally, if you set this to "random", it'll load a random theme each
# time that oh-my-zsh is loaded.
export FZF_DEFAULT_COMMAND='ag -g ""'
export LESS_TERMCAP_mb=$(tput bold; tput setaf 2) # green
export LESS_TERMCAP_md=$(tput bold; tput setaf 6) # cyan
export LESS_TERMCAP_me=$(tput sgr0)
export LESS_TERMCAP_so=$(tput bold; tput setaf 3; tput setab 4) # yellow on blue
export LESS_TERMCAP_se=$(tput rmso; tput sgr0)
export LESS_TERMCAP_us=$(tput smul; tput bold; tput setaf 7) # white
export LESS_TERMCAP_ue=$(tput rmul; tput sgr0)
export LESS_TERMCAP_mr=$(tput rev)
export LESS_TERMCAP_mh=$(tput dim)
export LESS_TERMCAP_ZN=$(tput ssubm)
export LESS_TERMCAP_ZV=$(tput rsubm)
export LESS_TERMCAP_ZO=$(tput ssupm)
export LESS_TERMCAP_ZW=$(tput rsupm)

export PATH="/home/charles/.gem/ruby/2.3.0/bin:$PATH"

# Uncomment the following line to use case-sensitive completion.
CASE_SENSITIVE="true"

function cd_save_file() {
  echo ~/.zsh_cd/$(basename "$TMUX").cd
}

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
plugins=(git)


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
alias vimomz="vim ~/.oh-my-zsh"

function fabtest() {
    . env/bin/activate
    fab test:"-k $1"
}

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
xset r rate 200 30

alias ys='yaourt --noconfirm -S'
alias yr='yaourt -R'
alias vundle='vim +PluginInstall +qall'
alias vimz='vim ~/.zshrc'
alias vimzh='vim ~/.zsh_history'
alias vimv='vim ~/.vimrc'
alias sl=ls
alias net='sudo netctl start HOME'
alias wifi='sudo wifi-menu'

export EDITOR=vim


setopt no_share_history

# OPAM configuration
. /home/charles/.opam/opam-init/init.zsh > /dev/null 2> /dev/null || true


setxkbmap us -variant colemak
source "$HOME/.antigen/antigen.zsh"

antigen-use oh-my-zsh
antigen theme arrow

antigen-apply
alias execc='eval "$(cat /tmp/file)"'
alias copyc='cat /tmp/file | xclip'
alias catc='cat /tmp/file'

function cdc() {
  echo "$(pwd)" > $(cd_save_file)
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

alias ghci='stack ghci'

[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

export PROMPT='%c -> '
export RPROMPT=''

alias spacemacs='bash -c "emacs &"'

cd $(cat $(cd_save_file) 2> /dev/null)
