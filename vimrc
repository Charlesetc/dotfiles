
" Neo bundle
if 0 | endif

if has('vim_starting')
  if &compatible
    set nocompatible               " Be iMproved
  endif
  set runtimepath+=~/.vim/bundle/neobundle.vim/
endif
call neobundle#begin(expand('~/.vim/bundle/'))
NeoBundleFetch 'Shougo/neobundle.vim'

" My Bundles here:
NeoBundle "Shougo/neocomplete"
NeoBundle 'honza/vim-snippets'
NeoBundle 'SirVer/ultisnips', {
            \ 'depends': ['vim-snippets'],
            \ }
NeoBundle 'fatih/vim-go'
NeoBundle 'kien/ctrlp.vim'
NeoBundle 'tpope/vim-fugitive'
NeoBundle 'git@github.com:parkr/vim-jekyll.git'
"NeoBundle 'git@github.com:szw/vim-ctrlspace.git'
NeoBundle 'git@github.com:dag/vim-fish.git'
NeoBundle 'git@github.com:scrooloose/nerdcommenter.git'

NeoBundle 'git@github.com:dag/vim-fish.git'
NeoBundle 'git@github.com:guns/vim-clojure-static.git'
NeoBundle 'git@github.com:goatslacker/mango.vim.git'

call neobundle#end()
filetype plugin indent on
NeoBundleCheck


"" Packages
"execute pathogen#infect() 

let g:neocomplete#enable_at_startup = 1
" Get rid of scratch buffer
set completeopt=menuone,menu,longest

let g:UltiSnipsExpandTrigger="<tab>"
let g:UltiSnipsJumpForwardTrigger="<c-b>"
let g:UltiSnipsJumpBackwardTrigger="<c-z>"


"" Leader

" Make space leader.
let mapleader="\<SPACE>"
noremap <SPACE> <Nop>

" Copy and past to clipboard
noremap <LEADER><S-p> "+p
noremap <LEADER>p o<ESC>"+p
noremap <LEADER>y "+yy
noremap <LEADER>w :w<CR>
noremap <LEADER>q :q!<CR>
noremap <LEADER>s :%s/
noremap <Leader>t :CtrlSpace<CR>
noremap <Leader><Tab> :bn<CR>
noremap <Leader>ve :e ~/.vimrc<CR>
noremap <Leader>vv :e ~/.vimrc<CR>
noremap <Leader>e  :Exp<CR>
noremap <Leader>x  :x<CR>
noremap <Leader>vs :so ~/.vimrc<CR>
noremap <Leader>d :bd<CR>
noremap <LEADER>r <Nop>
noremap <LEADER><ESC> <C-w>j:bd<CR>
noremap <LEADER>o :CtrlP<CR>
noremap <Leader>i :vsplit<CR>
noremap <Leader>u :split<CR>
noremap <Leader>* :vertical ball<CR>

"" Remapping

nmap <S-TAB> i
imap <S-TAB> <ESC>
noremap <S-j> b
noremap <S-k> e
noremap <S-h> b
noremap <S-l> e
noremap <S-n> b
noremap <S-m> j
noremap n h
nmap <Leader>j <C-w>j
nmap <Leader>k <C-w>k
nmap <Leader>l <C-w>l
nmap <Leader>h <C-w>h
nmap <S-d> diwi

" Get off my lawn
nnoremap <Left> :echoe "Use h"<CR>
nnoremap <Right> :echoe "Use l"<CR>
nnoremap <Up> :echoe "Use k"<CR>
nnoremap <Down> :echoe "Use j"<CR>

"" Commands

command! W w
command! Jekyll Jpost!


"" Anonymous Settings

" Syntax
set background=light
syntax on
colorscheme mango 

" Natural Splitting
set splitbelow
set splitright

"" Airline
"let g:airline_powerline_fonts = 1
"let g:airline_theme='ubaryd'
"set laststatus=2

" Tabs (indent)
set backspace=2
set autoindent
set expandtab
set tabstop=2
set shiftwidth=2

"" Spelling
set complete+=kspell


"" Languages
" Go
let g:go_fmt_command = "goimports"
let g:go_fmt_fail_silently = 1
let g:go_imports_autosave = 1
let g:go_doc_keywordprg_enabled = 0
au FileType go nmap <leader>r <Plug>(go-test)

" Clojure 
let g:clojure_align_multiline_strings = 1
let g:clojure_align_subforms = 1


" Markdown
autocmd BufNewFile,BufRead *.md set spell
autocmd BufNewFile,BufRead *.markdown set spell
