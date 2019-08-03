export PATH=$HOME/.bin:$PATH:$PATH
export PATH=$HOME/.gem/ruby/2.5.0/bin:$PATH
export PATH=$PATH:/usr/local/go/bin
export GOPATH=~/.go
export PATH=$PATH:$GOPATH/bin
export HOST='{home}'
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8
export LANGUAGE=en_US.UTF-8
export LANGUAGE="en_US.UTF-8"
export LC_ALL="en_US.UTF-8"
export LC_CTYPE=""
export LANG="en_US.UTF-8"
export LESS="--RAW-CONTROL-CHARS"
export LD_LIBRARY_PATH=/usr/local/lib:"$LD_LIBRARY_PATH"
export LD_LIBRARY_PATH=/usr/include/gtk-3.0:"$LD_LIBRARY_PATH"
export ZSH=/home/charles/.oh-my-zsh
export FZF_DEFAULT_COMMAND='rg --files'
export CASE_SENSITIVE="true"
export LESS='-R'
# export LESSOPEN='|~/.lessfilter %s'
export EDITOR='vim'
export BAT_THEME='GitHub'

. ~/.profile

ZSH_THEME="steeef"

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

source $ZSH/oh-my-zsh.sh
export SAVEHIST=1000000
export HISTFILE=~/.zhistory
setopt nologin
setopt INC_APPEND_HISTORY
setopt HIST_IGNORE_DUPS
setopt EXTENDED_HISTORY

function chpwd() {
  echo "$(pwd)" > ~/.cdsavefile
}
setopt autocd
cd $(cat ~/.cdsavefile 2> /dev/null)

bindkey -e

function vim() {
  if [ "$#" -eq 0 ]
  then
    FILE=`fzf`
    if [ -z "$FILE" ]
    then
      echo ""
    else
      print -s vim $FILE
      /usr/bin/vim -X $FILE
    fi
  else
    /usr/bin/vim -X $@
  fi
}

function made() {
  cd $1
  shift
  (make $@  && cd -) || cd -
}

function man() {
    LESS_TERMCAP_md=$'\e[01;31m' \
    LESS_TERMCAP_me=$'\e[0m' \
    LESS_TERMCAP_se=$'\e[0m' \
    LESS_TERMCAP_so=$'\e[01;44;33m' \
    LESS_TERMCAP_ue=$'\e[0m' \
    LESS_TERMCAP_us=$'\e[01;32m' \
    command man "$@"
}

fzf-cd-widget() {
  local cmd="${FZF_ALT_C_COMMAND:-"command find -L . -mindepth 1 \\( -path '*/\\.*' -o -fstype 'sysfs' -o -fstype 'devfs' -o -fstype 'devtmpfs' -o -fstype 'proc' \\) -prune \
    -o -type d -print 2> /dev/null | cut -b3-"}"
  setopt localoptions pipefail 2> /dev/null
  local dir="$(eval "$cmd" | FZF_DEFAULT_OPTS="--height ${FZF_TMUX_HEIGHT:-40%} --reverse $FZF_DEFAULT_OPTS $FZF_ALT_C_OPTS" $(__fzfcmd) +m)"
  if [[ -z "$dir" ]]; then
    zle redisplay
    return 0
  fi
  cd "$dir"
  local ret=$?
  zle fzf-redraw-prompt
  return $ret
}
zle -N fzf-cd-widget

# fzf-binary-widget() {fuzzy-find your path! Pretty sweet.
#   selected=( $( whence -pm '*' | \
#     xargs -IX basename X | \
#     FZF_DEFAULT_OPTS="--height \
#     ${FZF_TMUX_HEIGHT:-40%} $FZF_DEFAULT_OPTS \
#     -n2..,.. --tiebreak=index \
#     --bind=ctrl-r:toggle-sort \
#     $FZF_CTRL_R_OPTS --query=${(qqq)LBUFFER} \
#       +m" $(__fzfcmd)) )
#   local ret=$?
#   if [ -n "$selected" ]; then
#     LBUFFER="${RBUFFER}$selected "
#   fi
#   zle redisplay
#   return "$ret"
# }
# zle     -N   fzf-binary-widget
# bindkey '^H' fzf-binary-widget

bindkey '^U' fzf-cd-widget

[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
[ -f /usr/share/autojump/autojump.zsh ] && source /usr/share/autojump/autojump.zsh
. /home/charles/.opam/opam-init/init.zsh > /dev/null 2> /dev/null || true

alias vi=vim
alias l=ls
alias c=cd
alias gits='git s'
alias gitd='git d'
alias gitl='git l'
alias .z='. ~/.zshrc'
alias unquote='ruby -e "eval (\"puts \" + gets)"'
alias tmux="tmux -2"
alias s="ls"
alias jl="jq . | less"
alias lynx="lynx --accept_all_cookies"
alias vimt='vim ~/.tmux.conf'
# alias vimx='vim ~/.xinitrc'
alias vimz='vim ~/.zshrc'
alias vimzh='vim ~/.zhistory'
alias vimv='vim ~/.vimrc'
alias static='ruby -run -e httpd . -p 9000'
alias vimd='/usr/bin/vim'
alias sl=ls
alias ed="rlwrap ed -p'🌂  '"
alias whitespace="find * -type f -exec sed -i 's/ *$//' {} +"
alias xcopy='xclip -selection clipboard'
alias scheme='rlwrap bigloo'
alias python='python3'
alias apt='sudo apt install'
alias p='pijul'
alias pst='pijul status'
alias u='..'
alias u-='cd ..; cd -'
alias uu='../..'
alias uuu='../../..'
alias uuuu='../../../..'
alias ta='tmux a'
alias aseprite='/home/charles/build/aseprite/build/bin/aseprite'
alias spell='cat /usr/share/dict/words | fzf'
alias rg="rg --smart-case --colors 'match:fg:123,128,255' --colors 'line:fg:123,245,123' --colors 'path:fg:160,160,160'"
alias r=ranger
alias ag='rg'
function cmt() {
  git commit -m "$*"
}

function recipe() {
  if [[ "$1" == *"lines"* ]]
  then
    LESSOPEN= bash -c 'cd ~/desk/recipes; bash line.bash'
  else
    LESSOPEN= bash -c 'cd ~/desk/recipes; bash recipe.bash'
  fi
}

bindkey '^[[C' emacs-forward-word
bindkey '^[[D' emacs-backward-word

stty -ixon
