# portfolio-template-11ty

A portfolio template for graphic designers built with 11ty.

## Setup

To start using this repository, first clone it to your own GitHub account.

Open the repository in GitHub Codespaces (click the green Code button, then choose to create a new codespace)

Once the codespace is open, find the terminal, and type the following command:

`npm install`

This will install the project into the codespace environment and install all the tools it needs to build your site.

Once that command finishes, you can start up the site!

In the terminal, type the following command:

`npm run start`

This command tells the codespace to start a server so you can see your website. Once you run that command, you should see a popup in the corner with a link to click to open the site. If you don't see the popup, you can also click the "Ports" button in the bottom left of the codespace and click the link there.

In the terminal you will see a line "Server at http://localhost:8080/". You should be able to either control+click or command+click (depending on Mac or Windows) and you will be able to see your new site!

## Usage

`src/content/`: This is the main folder to place Markdown files in. Any files placed in this folder will be rendered as HTML.

`src/content/img`: This is the folder to place images in. You can reference these images in your Markdown files. Any images placed in this folder will be automatically resized and optimized to make your page load faster.

`/src/css/theme.scss`: This file contains a series of SASS variables that control various parameters of the site's appearance.

`/src/data/siteInfo.json`: This file contains a few variables, such as the name/subtitle for the top left corner, and a place to put a favicon.

`src/content/`: This is the main folder to place Markdown files in. Any files placed in this folder will be rendered as HTML.

# Sample sites

Here are some sites built using this template:

- [Christina Borghoff](https://christinaborghoff.com)
