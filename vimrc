
" Note: Skip initialization for vim-tiny or vim-small.
if 0 | endif 
if &compatible
	set nocompatible               " Be iMproved
endif

" Required:
set runtimepath+=~/.vim/bundle/neobundle.vim/
set runtimepath+=~/.jsx/after
set encoding=utf-8

" Required:
call neobundle#begin(expand('~/.vim/bundle/'))

" Let NeoBundle manage NeoBundle " Required:
NeoBundleFetch 'Shougo/neobundle.vim' 
NeoBundle 'goatslacker/mango.vim'
NeoBundle 'flazz/vim-colorschemes'
NeoBundle 'arcticicestudio/nord-vim'
" NeoBundle 'mkitt/tabline.vim'
"NeoBundle 'jakwings/vim-pony'
NeoBundle 'tpope/vim-fugitive'


NeoBundle 'elixir-editors/vim-elixir'
NeoBundle 'nvie/vim-flake8'
NeoBundle 'reasonml/vim-reason'
NeoBundle 'sbdchd/neoformat'
NeoBundle 'prabirshrestha/async.vim'
NeoBundle 'cespare/vim-toml'
" NeoBundle 'prabirshrestha/vim-lsp'
NeoBundle 'slashmili/alchemist.vim'
NeoBundle 'prabirshrestha/asyncomplete.vim'
NeoBundle 'prabirshrestha/asyncomplete-lsp.vim'
NeoBundle 'rust-lang/rust.vim'
NeoBundle 'rachitnigam/pyret-lang.vim'
NeoBundle 'JuliaEditorSupport/julia-vim'
NeoBundle 'tpope/vim-commentary'
NeoBundle 'ervandew/supertab'
NeoBundle 'kana/vim-textobj-user'
NeoBundle 'reedes/vim-colors-pencil'
NeoBundle 'reedes/vim-pencil'
NeoBundle 'owickstrom/vim-colors-paramount'
" NeoBundle 'junegunn/goyo.vim'
NeoBundle 'dracula/vim'
" NeoBundle 'junegunn/limelight.vim'
NeoBundle 'nanki/treetop.vim'
NeoBundle 'reedes/vim-textobj-quote'
NeoBundle 'ap/vim-buftabline'
NeoBundle 'fatih/vim-go'
NeoBundle 'ElmCast/elm-vim'
NeoBundle 'vito-c/jq.vim'
" NeoBundle 'vim-syntastic/syntastic'
" This screws up my searching:
" Never use it.
" NeoBundle 'vim-scripts/restore_view.vim'

NeoBundle 'rgrinberg/vim-ocaml'
" NeoBundle 'let-def/ocp-indent-vim'
NeoBundle 'tpope/vim-surround'
NeoBundle 'MarcWeber/vim-addon-ocamldebug'
NeoBundle 'markcornick/vim-bats'
NeoBundle 'purescript-contrib/purescript-vim'
NeoBundle 'FrigoEU/psc-ide-vim/'

" Folding
" set foldmethod=indent
" set foldlevel=0
" set foldnestmax=2
nnoremap <silent> ,n :call NextClosedFold('j')<cr>zz
nnoremap <silent> ,p :call NextClosedFold('k')<cr>zz
nnoremap <SPACE> :
nnoremap <PageUp> <C-u>
nnoremap <PageDown> <C-d>
nnoremap Q @@

nnoremap % %%v%

nnoremap <F8> :HardPencil<CR>
nnoremap <F7> :PencilOff<CR>


" My Bundles here:
" Refer to |:NeoBundle-examples|.
" Note: You don't set neobundle setting in .gvimrc!

call neobundle#end()

" Required:
filetype plugin indent on

" If there are uninstalled bundles found on startup,
" this will conveniently prompt you to install them.
NeoBundleCheck

set nocompatible              " be iMproved, required
filetype off                  " required

set incsearch

set nonu


let g:latex_to_unicode_auto = 1
let g:acp_enableAtStartup = 0
" Use smartcase.
" Set minimum syntax keyword length.
let g:easytags_async = 1
let g:easytags_auto_update = 0
  
set completeopt=menuone,menu,longest


" Leader
" Make space leader.
let mapleader=","
noremap , <Nop>


noremap <Leader>1 :buffer 1<CR>
noremap <Leader>2 :buffer 2<CR>
noremap <Leader>3 :buffer 3<CR>
noremap <Leader>4 :buffer 4<CR>
noremap <Leader>5 :buffer 5<CR>
noremap <Leader>6 :buffer 6<CR>



autocmd FileType rust nmap ,f :LspDefinition<CR>:redraw!<CR>
autocmd FileType rust nmap ,t :LspHover<CR>:redraw!<CR>
autocmd FileType rust nnoremap <CR> :w<CR>:LspDocumentDiagnostics<CR>:redraw!<CR>
" some more folding
autocmd FileType ocaml abbreviate qp (* *)<Left><Left><Left>
autocmd FileType ocaml abbreviate qpt (*! *)<Left><Left><Left>
autocmd FileType ocaml abbreviate qpd (** *)<Left><Left><Left>
autocmd FileType ocaml abbreviate qt (raise (Failure "unimplemented"))
autocmd FileType ocaml nnoremap ,t :MerlinTypeOf<CR>
autocmd FileType ocaml vnoremap ,t :MerlinTypeOfSel
autocmd FileType ocaml noremap ,f :MerlinLocate<CR>
autocmd FileType ocaml noremap ,, :MerlinErrorCheck<CR>
autocmd FileType reason noremap ,, :MerlinErrorCheck<CR>
autocmd FileType reason noremap ,t :MerlinTypeOf<CR>
autocmd FileType reason noremap ,f :MerlinLocate<CR>
autocmd FileType reason abbreviate qp /* */<Left><Left><Left>
autocmd FileType reason abbreviate qpt /*! */<Left><Left><Left>
autocmd FileType reason abbreviate qt raise(Failure("unimplemented"))
autocmd FileType reason abbreviate qi ignore(());<Left><Left><Left>
autocmd FileType ocaml abbreviate qi ignore ();<Left><Left>
autocmd FileType ocaml abbreviate  (** *)<Left><Left><Left>
" autocmd FileType purescript noremap ,, :Prebuild!<CR>
autocmd FileType purescript noremap ,t :Ptype<CR><CR>
autocmd FileType purescript noremap ,a :PaddType<CR><CR>
autocmd FileType purescript noremap ,f :Pgoto<CR>

noremap m :bn<CR>
noremap M :bp<CR>

inoremap ,. <C-x><C-o>

nnoremap <Leader>m :bn<CR>
nnoremap <Leader>M :bp<CR>
noremap <Leader>w :w<CR>
noremap <Leader>o :only<CR>
inoremap yw :w<CR>
noremap <Leader>q :qa!<CR>
nnoremap <Leader>s :%s/
vnoremap <Leader>s :s/
noremap <Leader><Tab> :bn<CR>
noremap <Leader>vv :e ~/.vimrc<CR>
noremap <Leader>x  :x<CR>
noremap <Leader>vs :so ~/.vimrc<CR>
noremap <Leader>d <C-w>j:close<CR>
noremap <Leader>z :bd<CR>
noremap <Leader>r <Nop>
noremap <Leader>E :Exp<CR>
noremap <Leader>i :vsplit<CR>
noremap <Leader>e :split<CR>
noremap <Leader>* :vertical ball<CR>
noremap <Leader>a g<C-g>
vnoremap <Backspace> :Commentary<CR>
noremap <Leader>c :Commentary<CR>
noremap <Leader>g :Gblame<CR>
noremap <Leader><ESC> :bd<CR>
noremap <Leader>` <C-w>j:close<CR>
noremap <Leader>` <C-w>j:close<CR>
" noremap <Leader><Leader> :w<CR>

noremap <Leader>r :!clear;nmake<CR>

" pretty awesome:
noremap <Leader>ve ^i <ESC>vk$s
noremap <Leader>vn a<CR><ESC>

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
nmap <Leader>J <C-w>J
nmap <Leader>K <C-w>K
nmap <Leader>L <C-w>L
nmap <Leader>H <C-w>H

nnoremap <S-o> o<ESC>

"" Commands

command! W w
" command! Jekyll Jpost!

"" Anonymous Settings

" Syntax
syntax on

" Natural Splitting
set splitbelow
set splitright

" Tabs (indent)
set backspace=2
set autoindent
set expandtab
set tabstop=2
set softtabstop=2
set shiftwidth=2
"set hlsearch  

" Vertical split
set laststatus=2
set fillchars+=vert:\ 


"" Spelling
set complete+=kspell
"" Languages
" Go        
let g:go_fmt_command = "goimports"
let g:go_fmt_fail_silently = 1
let g:go_imports_autosave = 1
let g:go_doc_keywordprg_enabled = 0
" au FileType go nmap <leader>r <Plug>(go-test)

ab pdb import pdb; pdb.set_trace()

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
inoremap <C-b> <Left>
inoremap <C-f> <Right>

set nohlsearch
set background=light
highlight search ctermfg=red ctermbg=none
highlight Pmenu ctermbg=black ctermfg=white
highlight todo ctermfg=black ctermbg=220
highlight linenr ctermfg=darkgrey ctermbg=None
highlight cursorlinenr ctermfg=74 ctermbg=None " blue
highlight VertSplit ctermfg=black ctermbg=black
highlight StatusLine ctermbg=black ctermfg=grey
highlight StatusLineNC ctermbg=black ctermfg=black
highlight Visual ctermbg=lightgreen ctermfg=black
highlight TabLineFill  ctermfg=Black  ctermbg=black     cterm=NONE
highlight TabLineSel   ctermfg=white  ctermbg=black  cterm=NONE
highlight Folded   ctermfg=75  ctermbg=Lightgrey  cterm=NONE
highlight TabLine      ctermfg=darkgrey  ctermbg=None  cterm=NONE
highlight BufTabLineActive   ctermfg=grey  ctermbg=black  cterm=NONE
highlight comment ctermfg=260 ctermbg=None
highlight normal  ctermbg=None ctermfg=231
highlight nontext  ctermbg=None ctermfg=black
colorscheme PaperColor

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

" au BufRead,BufNewFile *.re set filetype=rust
au BufRead,BufNewFile *.eliom set filetype=ocaml
au BufRead,BufNewFile *.test set filetype=bash
au BufRead,BufNewFile *.brie set filetype=brie
au BufRead,BufNewFile *.pear set filetype=brie
au BufRead,BufNewFile *.fun set filetype=sml
au BufRead,BufNewFile *.eliomi set filetype=ocaml
let g:textobj#quote#singleDefault = "''"
let g:limelight_conceal_ctermfg = 0

let g:html_use_css = 1

" awesome for colemak
imap yw <ESC>
imap Yw <ESC>
imap YW <ESC>

" set nu
" set rnu
" set norelativenumber

" Commentary
autocmd FileType sml setlocal commentstring=(*\ %s\ *)
" FUZZY FINDER:
set rtp+=~/.fzf
noremap <Leader>n :FZF<CR>

" let &colorcolumn=join(range(81,999),",")
" highlight ColorColumn ctermbg=253
abbreviate pry require 'pry'; binding.pry
abbreviate ql (Core.printf !"%{Source_code_position} %s\n" [%here] "");<LEFT><LEFT><LEFT>
autocmd BufWritePost *.py call Flake8()

" set shortmess+=F

set tags=.tags;$HOME

augroup fmt
  autocmd!
  autocmd BufWritePre *.ml Neoformat
augroup END
     
" if executable('rls')
au User lsp_setup call lsp#register_server({
        \ 'name': 'rls',
        \ 'cmd': {server_info->['rustup', 'run', 'nightly', 'rls']},
        \ 'whitelist': ['rust'],
        \ })
" endif 



let g:fzf_colors =
  \ { 'fg':      ['fg', 'Normal'],
  \ 'bg':      ['bg', 'Normal'],
  \ 'fg+':     ['fg', 'CursorLine', 'CursorColumn', 'Normal'],
  \ 'bg+':     ['bg', 'CursorLine', 'CursorColumn'],
  \ 'info':    ['fg', 'Special'],
  \ 'border':  ['fg', 'Ignore'],
  \ 'prompt':  ['fg', 'PreProc'],
  \ 'pointer': ['fg', 'Exception'],
  \ 'marker':  ['fg', 'Keyword'],
  \ 'spinner': ['fg', 'Label']}

" set formatprg=mix\ format\ 
" let g:mix_format_on_save = 1
let g:rustfmt_autosave = 1
" Merlin
let g:opamshare = substitute(system('opam config var share'),'\n$','','''')
execute "set rtp+=" . g:opamshare . "/merlin/vim"

" Ocamlformat stuff
" let g:neoformat_ocaml_ocamlformat = {
"             \ 'exe': 'ocamlformat',
"             \ 'args': ['-i']
"             \ }

let g:neoformat_enabled_ocaml = ['ocamlformat']
let g:neoformat_enabled_elixir = ['mixformat']
let g:neoformat_enabled_go = ['goimports']
let g:elm_format_autosave = 1

autocmd FileType * call SuperTabSetDefaultCompletionType("<c-x><c-o>")
" autocmd BufWritePost *.ml
set undodir=~/.vim/undodir
set undofile

augroup fmt
  autocmd!
  autocmd BufWritePre *.go Neoformat
  autocmd BufWritePre *.ex Neoformat
  autocmd BufWritePre *.exs Neoformat
  autocmd BufWritePre *.ml Neoformat
  autocmd BufWritePre *.mli Neoformat
augroup END

nnoremap == vip=g
inoremap =s <ESC>vipgqg$a

" set modelines=0
set lazyredraw
set pastetoggle=<F1>
set clipboard=unnamed
set number
