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

`npm run serve`

This command tells the codespace to start a server so you can see your website. Once you run that command, you should see a popup in the corner with **what does this actually say?**

In the terminal you will see a line "Server at http://localhost:8080/". You should be able to either control+click or command+click (depending on Mac or Windows) and you will be able to see your new site!

## Usage

`/content/data/siteInfo.json`: This file contains a few parameters for the site, including the site title and favicon.
`/content/pages/`: This is the main folder to place Markdown files in. Any files placed in this folder will be rendered as HTML.

`/content/css/theme.scss`: This file contains a series of SASS variables that control various parameters of the site's appearance.
`/content/css/custom.css`: This file is for adding custom styling.

### Front Matter
 
This project uses YAML front-matter to control various attributes of a page's appearance:
