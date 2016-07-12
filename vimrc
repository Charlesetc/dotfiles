
" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

Plugin 'VundleVim/Vundle.vim'


Plugin 'tpope/vim-fugitive'
Plugin 'goatslacker/mango.vim'

Plugin 'rust-lang/rust.vim'

Plugin 'altercation/vim-colors-solarized'

Plugin 'https://github.com/tpope/vim-commentary'

Plugin 'sickill/vim-monokai'

Plugin 'the-lambda-church/merlin'

" Plugin 'https://github.com/facebook/reason/tree/master/editorSupport/VimReason'

Plugin 'https://github.com/parkr/vim-jekyll'

call vundle#end()            " required
filetype plugin indent on    " required


" if !empty(system('which opam'))
"   " Merlin plugin
"   let s:ocamlmerlin=substitute(system('opam config var share'),'\n$','','') . "/merlin"
"   execute "set rtp+=".s:ocamlmerlin."/vim"
"   execute "set rtp+=".s:ocamlmerlin."/vimbufsync"
"   let g:syntastic_ocaml_checkers=['merlin']

"   " Reason plugin which uses Merlin
"   let s:reasondir=substitute(system('opam config var share'),'\n$','','') . "/reason"
"   execute "set rtp+=".s:reasondir."/editorSupport/VimReason"
"   let g:syntastic_reason_checkers=['merlin']
" else

" endif

set nocompatible              " be iMproved, required
filetype off                  " required


set clipboard=unnamed
set incsearch

set nonu

" FUZZY FINDER:
set rtp+=~/.fzf

let g:acp_enableAtStartup = 0
" Use smartcase.
" Set minimum syntax keyword length.
let g:easytags_async = 1
let g:easytags_auto_update = 0
  
set completeopt=menuone,menu,longest
hi Pmenu ctermbg=black ctermfg=white


" Leader
" Make space leader.
let mapleader="\<SPACE>"
noremap <SPACE> <Nop>

" Copy and past to clipboard
noremap <LEADER>t <C-]>
noremap <LEADER>w :w<CR>
noremap <LEADER>q :q!<CR>
noremap <LEADER>s :%s/
noremap <Leader><Tab> :bn<CR>
noremap <Leader>vv :e ~/.vimrc<CR>
noremap <Leader>x  :x<CR>
noremap <Leader>vs :so ~/.vimrc<CR>
noremap <Leader>d :bd<CR>
noremap <Leader>r <Nop>
noremap <Leader><ESC> <C-w>j:close<CR>
noremap <Leader>E :Exp<CR>
noremap <Leader>o :FZF<CR>
noremap <Leader>u :vsplit<CR>
noremap <Leader>l :split<CR>
noremap <Leader>* :vertical ball<CR>
noremap <Leader>a :Ag <cword><CR>
noremap <Leader>A :Ag 
noremap <Leader>` <C-w>j:close<CR>
noremap <Leader>/ :Commentary<CR>
noremap <Leader>gb :Gblame<CR>

noremap <Leader>r :!clear;make<CR>

" pretty awesome:
noremap <Leader>ve ^i <ESC>vk$s
noremap <Leader>vn a<CR><ESC>

noremap <Leader>, :! ctags --file-scope=no -R `pwd`; mv tags ~/.vim_ctags<CR>
set tags=~/.vim_ctags

"" Remapping

imap <S-TAB> <ESC>
map <S-TAB> <ESC>
nmap <S-TAB> i
noremap <C-n> }
noremap <C-e> {

nnoremap < <<
nnoremap > >>

nnoremap vw viw
nnoremap cw ciw
nnoremap dw ciw
nnoremap vv V

" Visual
noremap <C-v> v
noremap v <C-v>

" Moving around
nmap do ddeo

nmap <Leader>j <C-w>j
nmap <Leader>k <C-w>k
nmap <Leader>l <C-w>l
nmap <Leader>h <C-w>h
nmap <Leader>c :close<CR>

nnoremap <S-o> o<ESC>

"" Commands

command! W w
" command! Jekyll Jpost!


"" Anonymous Settings

" Syntax
syntax on
highlight Normal ctermfg=Black ctermbg=None
highlight Comment ctermfg=Gray
highlight NonText ctermfg=Gray

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
"set hlsearch  

" Vertical split
set laststatus=0
set fillchars+=vert:\ 


"" Spelling
set complete+=kspell
"" Languages
" Go        
let g:go_fmt_command = "goimports"
let g:go_fmt_fail_silently = 1
let g:go_imports_autosave = 1
let g:go_doc_keywordprg_enabled = 0
au FileType go nmap <leader>r <Plug>(go-test)

" Python
au FileType py set tabstop=8
au FileType py set expandtab
au FileType py set softtabstop=4
au FileType py set shiftwidth=4
au FileType py nmap <leader>r <Plug>(go-test)

" Rust

au FileType rs set tabstop=4
au FileType rs set shiftwidth=4

" Clojure 
let g:clojure_align_multiline_strings = 1
let g:clojure_align_subforms = 1

" Markdown
autocmd BufNewFile,BufRead *.md set spell
autocmd BufNewFile,BufRead *.markdown set spell

" Fake scrolling
nnoremap dg <C-u>
nnoremap gd <C-d>

set background=light
colorscheme monokai
highlight Normal ctermbg=black ctermfg=lightgrey
" highlight rustCommentLineDoc ctermfg=darkgrey
" highlight comment ctermfg=darkgrey
" highlight normal ctermfg=grey
" highlight identifier ctermfg=grey
" highlight function ctermfg=grey
" highlight constant ctermfg=grey
" highlight type ctermfg=grey
" highlight rustmodpath ctermfg=grey
" highlight number ctermfg=grey
" highlight operator ctermfg=grey
" highlight ruststorage ctermfg=grey
" highlight rustlifetime ctermfg=grey
" highlight rustmodpathsep ctermfg=grey
" highlight rustassert ctermfg=grey
" highlight rustsigil ctermfg=grey
" highlight panic ctermfg=grey
" highlight string ctermfg=white
" highlight rustattribute ctermfg=black
" highlight typedef ctermfg=grey
" highlight structure ctermfg=grey
" highlight boolean ctermfg=lightblue

" highlight keyword ctermfg=141 " purple
" highlight statement ctermfg=141
" highlight conditional ctermfg=141
" highlight storageclass ctermfg=141
" highlight repeat ctermfg=141

highlight todo ctermfg=220 ctermbg=None
highlight linenr ctermfg=darkgrey ctermbg=None
highlight cursorlinenr ctermfg=74 ctermbg=None " blue

highlight VertSplit ctermfg=black ctermbg=black

set relativenumber
au BufRead,BufNewFile *.re set filetype=rust

" awesome for colemak
imap yw <ESC>
