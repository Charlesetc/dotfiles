
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

NeoBundle 'Shougo/neocomplete'

NeoBundle 'Shougo/neosnippet'
NeoBundle 'Shougo/neosnippet-snippets'

" My Bundles here:
" Refer to |:NeoBundle-examples|.
" Note: You don't set neobundle setting in .gvimrc!

call neobundle#end()

" Required:
filetype plugin indent on

" If there are uninstalled bundles found on startup,
" this will conveniently prompt you to install them.
NeoBundleCheck

let g:neocomplete#enable_at_startup = 1
let g:acp_enableAtStartup = 0
" Use neocomplete.
let g:neocomplete#enable_at_startup = 1
" Use smartcase.
let g:neocomplete#enable_smart_case = 1
" Set minimum syntax keyword length.
let g:neocomplete#sources#syntax#min_keyword_length = 3
let g:neocomplete#lock_buffer_name_pattern = '\*ku\*'

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
noremap <Leader>r <Nop>
noremap <Leader><ESC> <C-w>j:bd<CR>
noremap <Leader>o :CtrlP<CR>
noremap <Leader>i :vsplit<CR>
noremap <Leader>u :split<CR>
noremap <Leader>* :vertical ball<CR>

"" Remapping

imap <S-TAB> <ESC>
map <S-TAB> <ESC>
nmap <S-TAB> i
noremap <C-j> b
noremap <C-k> e

vmap i I
vmap a A

" Visual
noremap <C-v> v
noremap v <C-v>
noremap <S-j> b

" Moving around
noremap <S-k> e
noremap <S-h> b
noremap <S-l> e
noremap <S-n> b
noremap <S-m> j

nmap <Leader>j <C-w>j
nmap <Leader>k <C-w>k
nmap <Leader>l <C-w>l
nmap <Leader>h <C-w>h
nmap <Leader>c :close<CR>
" nmap <S-d> :<CR>
nmap <S-d> ciw


" Maybe quite good
nmap e $
nmap b ^


" Get off my lawn
nnoremap <Left> :echoe "Use h"<CR>
nnoremap <Right> :echoe "Use l"<CR>
nnoremap <Up> :echoe "Use k"<CR>
nnoremap <Down> :echoe "Use j"<CR>

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

" Rust

au FileType rs set tabstop=4
au FileType rs set shiftwidth=4

" Clojure 
let g:clojure_align_multiline_strings = 1
let g:clojure_align_subforms = 1

" Markdown
autocmd BufNewFile,BufRead *.md set spell
autocmd BufNewFile,BufRead *.markdown set spell
