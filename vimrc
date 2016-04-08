
" Note: Skip initialization for vim-tiny or vim-small.
if 0 | endif

if has('vim_starting')
  if &compatible
    set nocompatible               " Be iMproved
  endif

  " Required:
  set runtimepath+=~/.vim/bundle/neobundle.vim/
endif

" Required:
call neobundle#begin(expand('~/.vim/bundle/'))
" Let NeoBundle manage NeoBundle
" Required:
NeoBundleFetch 'Shougo/neobundle.vim'

NeoBundle "rust-lang/rust.vim"
NeoBundle "goatslacker/mango.vim"
NeoBundle 'solarnz/thrift.vim'
NeoBundle 'git@github.com:fatih/vim-go.git'
" NeoBundle 'Shougo/neocomplete'
NeoBundle 'Shougo/neosnippet'
NeoBundle 'Shougo/neosnippet-snippets'
NeoBundle 'git@github.com:rking/ag.vim.git'
NeoBundle 'git@github.com:xolox/vim-misc.git'
NeoBundle 'git@github.com:nvie/vim-flake8.git'
NeoBundle 'tpope/vim-commentary'
NeoBundle 'mattn/webapi-vim'
NeoBundle 'tpope/vim-fugitive'
NeoBundle 'mattn/gist-vim'
" NeoBundle 'airblade/vim-gitgutter'

" My Bundles here:
" Refer to |:NeoBundle-examples|.
" Note: You don't set neobundle setting in .gvimrc!

call neobundle#end()

" Required:
filetype plugin indent on
cmap w!! w !sudo tee > /dev/null %


" If there are uninstalled bundles found on startup,
" this will conveniently prompt you to install them.
NeoBundleCheck

set clipboard=unnamed
set incsearch

set nu

" FUZZY FINDER:
set rtp+=~/.fzf

let g:neocomplete#enable_at_startup = 1
let g:acp_enableAtStartup = 0
" Use neocomplete.
let g:neocomplete#enable_at_startup = 1
" Use smartcase.
let g:neocomplete#enable_smart_case = 1
" Set minimum syntax keyword length.
let g:neocomplete#sources#syntax#min_keyword_length = 5
let g:neocomplete#lock_buffer_name_pattern = '\*ku\*'
let g:easytags_async = 1
let g:easytags_auto_update = 0

set completeopt=menuone,menu,longest
hi Pmenu ctermbg=black ctermfg=white

  " Plugin key-mappings.
imap <C-k>     <Plug>(neosnippet_expand_or_jump)
smap <C-k>     <Plug>(neosnippet_expand_or_jump)
xmap <C-k>     <Plug>(neosnippet_expand_target)

" SuperTab like snippets' behavior.
"imap <expr><TAB>
" \ pumvisible() ? "\<C-n>" :
" \ neosnippet#expandable_or_jumpable() ?
" \    "\<TAB>" : "\<Plug>(neosnippet_expand_or_jump)"
imap <expr><TAB> neosnippet#expandable_or_jumpable() ?
 \ "\<Plug>(neosnippet_expand_or_jump)" : (pumvisible() ? "\<C-n>" : "\<TAB>")


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

vnoremap i I
vnoremap l I
vnoremap a A

nnoremap vw viw
nnoremap cw ciw
nnoremap dw ciw
nnoremap vv V

" Visual
noremap <C-v> v
noremap v <C-v>

" Moving around

nmap <Leader>n <C-w>j
nmap <Leader>e <C-w>k
nmap <Leader>i <C-w>l
nmap <Leader>h <C-w>h
nmap <Leader>c :close<CR>
" nmap <S-d> :<CR>
nmap <S-d> ciw


" Maybe quite good
nmap e $
nmap b ^

nnoremap <S-o> o<ESC>

"" Commands

command! W w
command! Jekyll Jpost!


"" Anonymous Settings

" Syntax
set background=light
syntax on
colorscheme mango
highlight Normal ctermfg=Black
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

nnoremap h h|xnoremap h h|onoremap h h|
nnoremap n gj|xnoremap n gj|onoremap n gj|
nnoremap e gk|xnoremap e gk|onoremap e gk|
nnoremap i l|xnoremap i l|onoremap i l|

nnoremap h h|xnoremap h h|onoremap h h|
nnoremap j n|xnoremap j n|onoremap j n|
nnoremap k e|xnoremap k e|onoremap k e|
nnoremap l i|xnoremap l i|onoremap l i|

nnoremap H H|xnoremap H H|onoremap H H|
nnoremap J N|xnoremap J N|onoremap J N|
nnoremap K E|xnoremap K E|onoremap K E|
nnoremap L I|xnoremap L I|onoremap L I|

nnoremap <C-k> <C-e>

nnoremap <C-j> <C-y>

nnoremap H b|xnoremap H b|onoremap H b|
nnoremap N b|xnoremap N b|onoremap N b|
nnoremap E e|xnoremap E e|onoremap E e|
noremap I e|xnoremap I e|onoremap I e|
