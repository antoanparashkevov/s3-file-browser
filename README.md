# S3 File Browser

Run `npm install` to install all dependencies and then `npm start` to start the development server

# Table of Contents
- <a href="#about">About this Project</a>
- <a href="#how-to-run">How to run the app on your computer</a>
- <a href="#features">Features</a>
- <a href="#project-structure">Project Structure</a>
- <a href="#tools">Tools</a>
- <a href="#application-pictures">Application Pictures</a>

# <p id="about">About this project</p>

S3 File System is a React Front End application that enables users to browse an S3 bucket as a filesystem and to perform various operations such as create, read, and delete files.

# <p id="how-to-run">How to run the app on your computer</p>

1. You can download the project ZIP file or you can clone the repository directly.
2. Open the project with IDE/Code Editor like VS Code or any of the JetBrains product which supports the JavaScript syntax.
3. Install all modules that are listed on `package.json` file and their dependencies with `npm install` or `yarn install`.
4. Type `npm start` to run the project in the browser. It will start on `http://localhost:3000`.


# <p id="features">Features</p>

- <strong>Authentication</strong>
    - Login
        - log in with your S3 credentials (S3 secret key, access key id, bucket name)

- <strong>Current Working Directory</strong>
    - Displays the entire content (files and directories) of the current working directory.
    - Initially, the root directory is considered current.
    - Navigate up and down the directory structure.
      - Double-click on a folder enters into the selected folder.
      - Previous arrow to go back.
    - Read the content of a file (double-click on a file).
    - Create new subdirectories.
    - Create new files with a given content.
    - Delete files (right-click on a file).

- <strong>Tree view</strong>
    - Shows only directories.
    - Initially, it shows only the root subdirectories.
    - A directory containing subdirectories is marked with an arrow.
    - When a marked directory is clicked, its subdirectories are displayed.
    - If an expanded directory is clicked, it collapses.
    - The current working directory is decorated.

# <p id="project-structure">Project Structure</p>
- App.tsx
    - DirectoryTree
        - DirectoryTreeItem
    - CurrentDirectory
        - CurrentDirectoryActions - Create Folder, Create File, Previous Arrow
        - CurrentDirectoryView
          - CurrentDirectoryViewItem
    - hooks - outsourcing stateful logic into reusable functions
        - use-data
            - synchronize with an external system (get, create, read, delete)
        - use-fetch-objects
            - fetches objects from a bucket whenever a prefix changes and on initial load
        - use-input
            - skeleton/template for any input around the Web App
    - store - Redux => State Management System
        - authSlice
            - manage the auth state such as isAuthenticated status
        - awsSlice
            - manage the aws state such as currentDirectory, absolutePath

# <p id="tools">Tools</p>

- <a href="https://react.dev/">React</a>
- <a href="https://sass-lang.com/">Scss</a>

# <p id="application-pictures">Application Pictures</p>

![authenticate](https://github.com/antoanparashkevov/s3-file-browser/assets/80749603/737435e8-a694-442e-9b84-3a2ad5023388)
![error](https://github.com/antoanparashkevov/s3-file-browser/assets/80749603/96bfa4a2-65f8-4fa3-8373-2c90e06afb7b)
![main_page](https://github.com/antoanparashkevov/s3-file-browser/assets/80749603/a2dea3b3-0693-4414-9dbd-0d3b4d79ccf6)
![read_file](https://github.com/antoanparashkevov/s3-file-browser/assets/80749603/6fc6ae8a-3046-4370-88bd-6742d9bc526f)
![create_folder](https://github.com/antoanparashkevov/s3-file-browser/assets/80749603/4d8172c2-4e1e-4cea-8b68-3fbc06595e99)
![create_file](https://github.com/antoanparashkevov/s3-file-browser/assets/80749603/b13c2834-f2e2-495a-9c61-fa92a99379ae)
