
" Note: Skip initialization for vim-tiny or vim-small.
if 0 | endif

if &compatible
	set nocompatible               " Be iMproved
endif

" Required:
set runtimepath+=~/.vim/bundle/neobundle.vim/
set runtimepath+=~/.jsx/after

" Required:
call neobundle#begin(expand('~/.vim/bundle/'))

" Let NeoBundle manage NeoBundle " Required:
NeoBundleFetch 'Shougo/neobundle.vim' 
NeoBundle 'goatslacker/mango.vim'
" NeoBundle 'scrooloose/syntastic'
" NeoBundle 'mkitt/tabline.vim'
NeoBundle 'eagletmt/neco-ghc'
NeoBundle 'tpope/vim-fugitive'
NeoBundle 'tpope/vim-commentary'
NeoBundle 'flazz/vim-colorschemes'
NeoBundle 'ap/vim-buftabline'
NeoBundle 'vim-scripts/restore_view.vim'
NeoBundle 'reedes/vim-pencil'
NeoBundle 'rust-lang/rust.vim'
NeoBundle 'dleonard0/pony-vim-syntax'

NeoBundle 'tpope/vim-surround'
" NeoBundle 'MarcWeber/vim-addon-ocamldebug'
NeoBundle 'markcornick/vim-bats'
NeoBundle 'raichoo/purescript-vim'
NeoBundle 'vim-scripts/mom.vim'

NeoBundle 'fatih/vim-go'

NeoBundle 'neovimhaskell/haskell-vim'
NeoBundle 'rgrinberg/vim-ocaml'
NeoBundle 'let-def/ocp-indent-vim'

" Folding
" set foldmethod=indent
" set foldlevel=0
" set foldnestmax=2
nnoremap <silent> ,n :call NextClosedFold('j')<cr>zz
nnoremap <silent> ,p :call NextClosedFold('k')<cr>zz

nnoremap % %%v%

let g:go_fmt_autosave = 1
let g:go_fmt_command = "goimports"

" let g:ycm_semantic_triggers = {'haskell' : ['.']}


" My Bundles here:
" Refer to |:NeoBundle-examples|.
" Note: You don't set neobundle setting in .gvimrc!

call neobundle#end()

" Required:
filetype plugin indent on

" If there are uninstalled bundles found on startup,
" this will conveniently prompt you to install them.
NeoBundleCheck

" if executable('ocamlmerlin')
"   " To set the log file and restart:
"   let s:ocamlmerlin=substitute(system('which ocamlmerlin'),'ocamlmerlin\n$','','') . "../share/ocamlmerlin/vim/"
"   execute "set rtp+=".s:ocamlmerlin
" endif
if executable('refmt')
  let s:reason=substitute(system('which refmt'),'refmt\n$','','') . "../share/reason/editorSupport/VimReason"
  execute "set rtp+=".s:reason
  let g:syntastic_reason_checkers=['merlin']
endif

set nocompatible              " be iMproved, required
filetype off                  " required

let g:airline#extensions#tabline#enabled = 1

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


noremap <LEADER>1 :buffer 1<CR>
noremap <LEADER>2 :buffer 2<CR>
noremap <LEADER>3 :buffer 3<CR>
noremap <LEADER>4 :buffer 4<CR>
noremap <LEADER>5 :buffer 5<CR>
noremap <LEADER>6 :buffer 6<CR>

" some more folding
noremap ,, za
noremap ,a zA
noremap ,t zR
noremap ,c zM

" Copy and past to clipboard
nnoremap <LEADER>t :bn<CR>
nnoremap <LEADER>T :bp<CR>
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
noremap <Leader>i :vsplit<CR>
noremap <Leader>e :split<CR>
noremap <Leader>* :vertical ball<CR>
noremap <Leader>a :Ag <cword><CR>
noremap <Leader>A :Ag 
noremap <Leader>` <C-w>j:close<CR>
noremap <Leader>/ :Commentary<CR>
noremap <Leader>gb :Gblame<CR>
noremap <Leader><Leader> :w<CR>

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
" set shiftwidth=2
" set smartindent
" set autoindent
"set hlsearch  
"
"
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

ab pdb import pdb; pdb.set_trace()

" Python
au FileType py set tabstop=8
au FileType py set expandtab
au FileType py set softtabstop=4
au FileType py set shiftwidth=4
au FileType py nmap <leader>r <Plug>(go-test)

" Rust

" au FileType rs set tabstop=4
" au FileType rs set shiftwidth=4

" Clojure 
let g:clojure_align_multiline_strings = 1
let g:clojure_align_subforms = 1

" Markdown
autocmd BufNewFile,BufRead *.md set spell
autocmd BufNewFile,BufRead *.markdown set spell


" Fake scrolling
nnoremap dg <C-u>
nnoremap gd <C-d>

if $TTYl != '/dev/pts/1'
  highlight normal ctermbg=None ctermfg=grey
  colorscheme bayQua
  set background=light
  hi identifier ctermfg=186
  hi comment ctermfg=blue ctermbg=none
  hi keyword ctermfg=4
  hi constant ctermfg=5
  hi preproc ctermfg=blue
else
  colorscheme mango
  set relativenumber
  set background=light
endif

highlight linenr ctermfg=darkgrey ctermbg=None

highlight incsearch ctermbg=black ctermfg=lightgreen
set nohlsearch

highlight todo ctermfg=220 ctermbg=None
highlight cursorlinenr ctermfg=74 ctermbg=None " blue


highlight Visual ctermbg=lightblue
hi TabLine      ctermfg=235  ctermbg=None  cterm=NONE
hi TabLineFill  ctermfg=Black  ctermbg=None     cterm=NONE
hi TabLineSel   ctermfg=lightgrey  ctermbg=235  cterm=NONE
hi Folded   ctermfg=75  ctermbg=Lightgrey  cterm=NONE

" :syntax off

command French setlocal spell spelllang=fr
command English setlocal spell spelllang=en

function! NextClosedFold(dir)
    let cmd = 'norm!z' . a:dir
    let view = winsaveview()
    let [l0, l, open] = [0, view.lnum, 1]
    while l != l0 && open
        exe cmd
        let [l0, l] = [l, line('.')]
        let open = foldclosed(l) < 0
    endwhile
    if open
        call winrestview(view)
    endif
endfunction

autocmd BufWritePost *.re ReasonPrettyPrint


let g:pencil#wrapModeDefault = 'hard'   " default is 'hard'
" let g:pencil#textwidth = 50
let g:pencil#autoformat = 1

augroup pencil
  autocmd!
  autocmd FileType markdown,mkd call pencil#init()
  " autocmd FileType text         call pencil#init({'wrap': 'hard'})
augroup END

hi EnclosingExpr ctermbg=None ctermfg=magenta

au BufRead,BufNewFile *.rs set filetype=rust
au BufNewFile,BufRead *.eqn set filetype=groff

let g:html_use_css = 1

" awesome for colemak
imap yw <ESC>
autocmd FileType ocaml source /home/charles/.opam/4.02.3/share/ocp-indent/vim/indent/ocaml.vim
set backspace=2
set expandtab
set shiftwidth=2
set softtabstop=2
