
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
" NeoBundle 'mkitt/tabline.vim'
NeoBundle 'dleonard0/pony-vim-syntax'
NeoBundle 'tpope/vim-fugitive'

NeoBundle 'reasonml/vim-reason'
NeoBundle 'JuliaEditorSupport/julia-vim'
NeoBundle 'tpope/vim-commentary'
NeoBundle 'kana/vim-textobj-user'
NeoBundle 'reedes/vim-colors-pencil'
NeoBundle 'reedes/vim-pencil'
NeoBundle 'owickstrom/vim-colors-paramount'
NeoBundle 'junegunn/goyo.vim'
NeoBundle 'dracula/vim'
NeoBundle 'junegunn/limelight.vim'
NeoBundle 'nanki/treetop.vim'
NeoBundle 'reedes/vim-textobj-quote'
NeoBundle 'ap/vim-buftabline'
NeoBundle 'elixir-lang/vim-elixir'
NeoBundle 'fatih/vim-go'
NeoBundle 'ElmCast/elm-vim'
NeoBundle 'vito-c/jq.vim'
" This screws up my searching:
" Never use it.
" NeoBundle 'vim-scripts/restore_view.vim'

NeoBundle 'rgrinberg/vim-ocaml'
NeoBundle 'let-def/ocp-indent-vim'
NeoBundle 'tpope/vim-surround'
NeoBundle 'MarcWeber/vim-addon-ocamldebug'
NeoBundle 'markcornick/vim-bats'
NeoBundle 'raichoo/purescript-vim'

" Folding
" set foldmethod=indent
" set foldlevel=0
" set foldnestmax=2
nnoremap <silent> ,n :call NextClosedFold('j')<cr>zz
nnoremap <silent> ,p :call NextClosedFold('k')<cr>zz

nnoremap % %%v%


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
" if executable('refmt')
  " let s:reason=substitute(system('which refmt'),'refmt\n$','','') . "../share/reason/editorSupport/VimReason"
  " execute "set rtp+=".s:reason
  " let g:syntastic_reason_checkers=['merlin']
" endif

set nocompatible              " be iMproved, required
filetype off                  " required

set clipboard=unnamed
set incsearch

set nonu


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
noremap <Leader>i :vsplit<CR>
noremap <Leader>e :split<CR>
noremap <Leader>* :vertical ball<CR>
noremap <Leader>a g<C-g>
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
" highlight Comment ctermfg=Gray
highlight NonText ctermfg=Gray

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

set background=dark
" colorscheme Tomorrow-Night-Eighties
" colorscheme dracula
colorscheme mango
" colorscheme paramount

" hi comment ctermfg=violet
" set background=light
" " highlight rustCommentLineDoc ctermfg=darkgrey
" highlight comment ctermfg=grey
" highlight normal ctermfg=white
" highlight identifier ctermfg=white
" highlight function ctermfg=white
" highlight constant ctermfg=white
" highlight type ctermfg=white
" highlight rustmodpath ctermfg=grey
" highlight number ctermfg=darkgrey
" highlight operator ctermfg=white
" highlight ruststorage ctermfg=grey
" highlight rustlifetime ctermfg=grey
" highlight rustmodpathsep ctermfg=grey
" highlight rustassert ctermfg=grey
" highlight rustsigil ctermfg=grey
" highlight panic ctermfg=grey
" highlight string ctermfg=white
" highlight character ctermfg=black
" highlight rustattribute ctermfg=black
" highlight typedef ctermfg=black
" highlight structure ctermfg=black
" highlight boolean ctermfg=black 
" highlight keyword ctermfg=darkgray
" highlight incsearch ctermbg=black ctermfg=lightgreen
" highlight statement ctermfg=74
" highlight conditional ctermfg=black
" highlight storageclass ctermfg=black
" highlight repeat ctermfg=141
"

set nohlsearch

highlight todo ctermfg=220 ctermbg=None
highlight linenr ctermfg=darkgrey ctermbg=None
highlight cursorlinenr ctermfg=74 ctermbg=None " blue

highlight normal ctermbg=None

highlight VertSplit ctermfg=black ctermbg=black

highlight Visual ctermbg=lightgreen
hi TabLine      ctermfg=darkgrey  ctermbg=None  cterm=NONE
hi TabLineFill  ctermfg=Black  ctermbg=None     cterm=NONE
hi TabLineSel   ctermfg=white  ctermbg=black  cterm=NONE
hi Folded   ctermfg=75  ctermbg=Lightgrey  cterm=NONE

" hi Number ctermfg=68
" hi Float ctermfg=68
" hi preproc ctermfg=darkblue
" hi matchparen ctermbg=33
" hi Macro ctermfg=darkblue
" hi include ctermfg=darkblue
" hi define ctermfg=darkblue

" :syntax off

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

function Writen()
  :SoftPencil
  " :colorscheme abra
  :call textobj#quote#init()
  :Goyo
  :hi title ctermbg=none ctermfg=grey
  " :set showtabline=1
  :hi nontext ctermbg=none ctermfg=white
  :hi tablinesel ctermbg=none ctermfg=white
  :hi tabline ctermbg=none ctermfg=white
  :hi tablinefill ctermbg=none ctermfg=white
  :hi statusline ctermbg=none ctermfg=white
  :hi statuslinenc ctermbg=none ctermfg=white
  :hi title ctermbg=none ctermfg=white
  :hi markdownH1 ctermfg=grey
  :hi vertsplit ctermbg=none
endfunction

command Write exec Writen()
command WW exec Writen()
hi comment ctermfg=280

" hi EnclosingExpr ctermbg=None ctermfg=magenta

" au BufRead,BufNewFile *.re set filetype=rust
au BufRead,BufNewFile *.eliom set filetype=ocaml
au BufRead,BufNewFile *.brie set filetype=brie
au BufRead,BufNewFile *.pear set filetype=brie
au BufRead,BufNewFile *.eliomi set filetype=ocaml
let g:textobj#quote#singleDefault = "''"
let g:limelight_conceal_ctermfg = 0

let g:html_use_css = 1

" awesome for colemak
imap yw <ESC>
" autocmd FileType ocaml source /home/charles/.opam/4.02.3/share/ocp-indent/vim/indent/ocaml.vim
set norelativenumber

let mapleader="\<SPACE>"
noremap <SPACE> <Nop>
" FUZZY FINDER:
set rtp+=~/.fzf
noremap <Leader>o :FZF<CR>
" Wtf is all of this:
" ## added by OPAM user-setup for vim / base ## 93ee63e278bdfc07d1139a748ed3fff2 ## you can edit, but keep this line
let s:opam_share_dir = system("opam config var share")
let s:opam_share_dir = substitute(s:opam_share_dir, '[\r\n]*$', '', '')

let s:opam_configuration = {}

function! OpamConfOcpIndent()
  execute "set rtp^=" . s:opam_share_dir . "/ocp-indent/vim"
endfunction
let s:opam_configuration['ocp-indent'] = function('OpamConfOcpIndent')

function! OpamConfOcpIndex()
  execute "set rtp+=" . s:opam_share_dir . "/ocp-index/vim"
endfunction
let s:opam_configuration['ocp-index'] = function('OpamConfOcpIndex')

function! OpamConfMerlin()
  let l:dir = s:opam_share_dir . "/merlin/vim"
  execute "set rtp+=" . l:dir
endfunction
let s:opam_configuration['merlin'] = function('OpamConfMerlin')

let s:opam_packages = ["ocp-indent", "ocp-index", "merlin"]
let s:opam_check_cmdline = ["opam list --installed --short --safe --color=never"] + s:opam_packages
let s:opam_available_tools = split(system(join(s:opam_check_cmdline)))
for tool in s:opam_packages
  " Respect package order (merlin should be after ocp-index)
  if count(s:opam_available_tools, tool) > 0
    call s:opam_configuration[tool]()
  endif
endfor

:abbreviate pry require 'pry'; binding.pry
" ## end of OPAM user-setup addition for vim / base ## keep this line
