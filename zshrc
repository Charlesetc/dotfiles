# Path to your oh-my-zsh installation.
  export ZSH=/home/uber/.oh-my-zsh

# Set name of the theme to load.
# Look in ~/.oh-my-zsh/themes/
# Optionally, if you set this to "random", it'll load a random theme each
# time that oh-my-zsh is loaded.
ZSH_THEME="arrow"

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

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

  export PATH="/home/uber/.go/bin:/home/uber/.go/bin:/usr/lib/ccache:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/home/uber/fzf/bin:/home/uber/gocode/bin:/usr/local/go/bin:/home/uber/.rvm/bin:/home/uber/.rvm/bin"
# export MANPATH="/usr/local/man:$MANPATH"

source $ZSH/oh-my-zsh.sh

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
      /usr/bin/vim $FILE
    fi
  else
    /usr/bin/vim $@
  fi
}

. ~/.scripts/zsh-hack


# function sc() {
#   PORT=4561
#   if [ $1 -eq '-p' ]
#   then
#     PORT=$2
#   fi
#   schemaless-client -u
alias vi=vim
alias l=ls
alias c=cd
alias gits='git s'
alias gitl='git l'
alias .env='. env/bin/activate'
alias .pypy='. pypyenv/bin/activate'
alias .z='. ~/.zshrc'
alias clip='tee >(nc localhost 5556) | nc localhost 5556'
alias unquote='ruby -e "eval (\"puts \" + gets)"'

alias tmux="tmux -2"
alias s="ls"

alias sc="schemaless-client -u4561 -dtrips"
alias sa="schemaless-admin"
alias jl="jq . | less"

alias schema='tmux split-window -v; tmux resize-pane -y 10; tmux send-keys "cd ~/mezzanine; . env/bin/activate; fab serve" ENTER; tmux split-window -h; tmux send-keys "cd ~/trifle; . env/bin/activate; fab serve" ENTER; tmux select-pane -U'
alias trident='tmux split-window -h; tmux resize-pane -x 40; tmux send-keys "cd ~/trident; . env/bin/activate; fab serve" ENTER; tmux select-pane -L'
alias mez='tmux split-window -h; tmux resize-pane -x 40; tmux send-keys "cd ~/mezzanine; . env/bin/activate; fab serve" ENTER; tmux select-pane -L'
alias api='tmux split-window -h; tmux resize-pane -x 40; tmux send-keys "cd ~/api; . env/bin/activate; fab serve" ENTER; tmux select-pane -L'
# }

# added by newengsetup
export EDITOR=vim
export GOPATH=~/.go
export PATH=~/.go/bin:$PATH
export UBER_HOME="$HOME/.uber"
export UBER_DATACENTER=sjc1
export UBER_OWNER="charlesc@uber.com"
export VAGRANT_DEFAULT_PROVIDER=aws
# [ -s "/usr/local/bin/virtualenvwrapper.sh" ] && . /usr/local/bin/virtualenvwrapper.sh
# [ -s "$HOME/.nvm/nvm.sh" ] && . $HOME/.nvm/nvm.sh
# if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi

cdsync () {
    cd $(boxer sync_dir $@)
}
editsync () {
    $EDITOR $(boxer sync_dir $@)
}
opensync () {
    open $(boxer sync_dir $@)
}


u_phab () {
    hi="$@"
    bash -c "cd ~/u_phab; ./u_phab \"$hi\""
}

export LESS='-R'
export LESSOPEN='|~/.lessfilter %s'

export VIRTUAL_ENV_DISABLE_PROMPT=1

cowsay -f ~/.scripts/elephant.cow "opal" | lolcat

setopt no_share_history

[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
