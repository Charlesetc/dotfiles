install:
	cp vimrc ~/.vimrc
	cp zshrc ~/.zshrc
	cp gitconfig ~/.gitconfig
	cp tmux.conf ~/.tmux.conf

light:
	cat vimrc | head -n -35 > ~/.vimrc
