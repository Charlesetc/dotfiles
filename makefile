install:
	cp vimrc ~/.vimrc
	cp zshrc ~/.zshrc
	cp gitconfig ~/.gitconfig
	cp spacemacs ~/.spacemacs
	cp tmux.conf ~/.tmux.conf
	cp steeef.zsh-theme ~/.oh-my-zsh/themes/steeef.zsh-theme

save:
	cp ~/.vimrc vimrc
	cp ~/.zshrc zshrc
	cp ~/.gitconfig gitconfig
	cp ~/.spacemacs spacemacs
	cp ~/.tmux.conf tmux.conf
	cp ~/.oh-my-zsh/themes/steeef.zsh-theme steeef.zsh-theme

push:
	git a
	git commit -m "addition to dotfiles"
	git push origin master

light:
	cat vimrc | head -n -35 > ~/.vimrc
