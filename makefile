install:
	cp vimrc ~/.vimrc
	cp zshrc ~/.zshrc
	cp gitconfig ~/.gitconfig
	cp tmux.conf ~/.tmux.conf

save:
	cp ~/.vimrc vimrc
	cp ~/.zshrc zshrc
	cp ~/.gitconfig gitconfig
	cp ~/.tmux.conf tmux.conf

push:
	git a
	git commit -m "addition to dotfiles"
	git push origin master

light:
	cat vimrc | head -n -35 > ~/.vimrc
