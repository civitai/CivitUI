

# [SabreUI](#sabre) - A [ComfyUI](https://github.com/comfyanonymous/ComfyUI) restyle

<div align="center"> 
  
 ### [ [Windows](#windows) | [MacOS](#macos) | [Linux](#linux) ]

<hr>
 
#### Our Design Principles  </div>
##
> ##### I. Insight is an essential right and paves the way for safeguarding others' rights. </span>
> ##### II. Our task is to dissolve obstacles, inviting self-realization, connection, and understanding.
> ##### III. Let the transcendence of manual tasks give way to exploration, inspiration and creativity.
> ##### IV. Together, today, we refine our world with the systematic and spontaneous.
> ##### V: As much as necessary, with as little as possible.

##

![A screenshot of the UI showing a black graph and labeled boxes, which are nodes spread across the graph. The boxes are organized in a creative and flowing manner](https://github.com/MaxTretikov/SabreUI/assets/91800957/d842e05c-a903-4579-8259-9e29b117c0a4)

</div>

  
##

> [!TIP]
>
> ##### For best results, we recommend using SabreUI with 3D graphics cards. Please ensure you have the current driver installed for your card. [NVIDIA.](https://www.nvidia.com/Download/index.aspx) [AMD.](https://www.amd.com/en/support/download/drivers.html)
##
> <a name="windows">

<details><summary>

  ## Windows<hr></summary>
>
> ##
>
>  #### Typical Installation
>
1. > ######  Download [Python](https://www.python.org/downloads/windows/)
2. > ######  Check the `Install for All Users` and `Add Python.exe to Path` boxes in the installer 
   >
   - [x] Install for All Users
   - [x] Add python.exe to Path
3. > ###### Confirm Python's installation . Hit Windows + R and write
   > ```
   > cmd /k where python && pause
   > ```
   > ##### This command should print a line that says something similar to `C:\Directory\Scripts\python.exe` If not, ensure the entered/ command is identical, then reboot and try again, or repeat the install step, double-checking that the options are selected.
4. > ###### Download [Git](https://git-scm.com/download/win)
5. > ###### In the installer, ensure the Git LFS box is marked
   >
   - [x] Git LFS (Large File Support)
6. > ###### Set Git to be usable from Windows Command line
   >
   - [x] Git from the command line and also from 3rd-party software.
7. > ###### Set the option to `Use Windows' default console window`
   >
   - [x]  Use Windows' default console window
8. > ###### Confirm the install by opening Command Prompt or Powershell. Hit Windows + R and write
   > ```
   > cmd /k where git && pause
   > ```
   > ##### This should print a line that says something similar to `C:\Program Files\Git\git.exe` If not, check your spelling, reboot and try again, or repeat the install step, double-checking that the options are selected.
 9. > ##### While the terminal window is open, change the behavior of Command Prompt so it does not freeze when clicked:
    > ##### i. `right click` the Command Prompt title bar
    > ##### ii. choose `Properties` and uncheck the `QuickEdit Mode` box. Hit `OK`.
    > - [ ] QuickEdit Mode
 ##
 ### Please continue your installation by following [the python instructions](#python)
 ##
  
<details> <summary>

>
> #### Alternative Windows Subsystem for Linux Installation </summary>
 
> ##### Though more AI components are supporte by WSL, these benefits may not compensate for the performance loss of WSL. For the best experience, we recommend using *[Windows Manual Install instructions](#windows)*.
1. > ######  Allow WSL through your firewall using Powershell with the following command in CMD:
   > ```
   > powershell New-NetFirewallRule -Program “%SystemRoot%\System32\wsl.exe” -Action Allow -Profile Domain, Private -DisplayName “Allow WSL” > -Description “Allow WSL” -Direction Outbound
   > ```
2. > ###### Enable Control Flow Guard
   > ```
   > powershell Set-ProcessMitigation -Name vmcompute.exe -Enable CFG
   > ```
3. > ###### i. [Download And Install Ubuntu LTS for WSL](https://learn.microsoft.com/en-us/windows/wsl/install-manual#downloading-distributions) 
   > ###### OR 
3. > ###### ii. Download and Install Ubuntu LTS with Windows Subsystem for Linux from Command Line
   > ```
   > wsl --install -d Ubuntu --web-download
   > ```
4. > ###### Open WSL
   > ```
   > wsl
   > ```
5. > ###### Ensure Latest Python and Git
   > ```
   > sudo apt-get -y install python3 python3-venv python3-pip git
   > ```
6. > ##### Dedicate more system RAM by making a .wslconfig file. Follow [these instructions from Microsoft](https://learn.microsoft.com/en-us/windows/wsl/wsl-config#example-wslconfig-file)

   
> ##### Next, choose your graphics card type below
> ##
<details><summary>

   > ### NVIDIA </summary>
   1. > ###### i. Get NVIDIA keys
      >  ```
      > wget https://developer.download.nvidia.com/compute/cuda/repos/wsl-ubuntu/x86_64/cuda-keyring_1.1-1_all.deb
      >  ```
      > **OR**
   1. > ###### ii. Add NVIDIA to your repository sources
      > ```
      > sudo 'echo "http://developer.download.nvidia.com/compute/cuda/repos/wsl-ubuntu/x86_64 /" > /etc/apt/sources.list.d/cuda.list'
      > ```
   2. > ###### Install Key
      > ```
      > sudo dpkg -i cuda-keyring_1.1-1_all.deb
      > ```
      >
   3. > ###### Install **CUDA-TOOLKIT**
      > ```
      > sudo apt-get -y install cuda-toolkit-12-5
      > ```
  </details> 

>
> ##
 <details><summary>
   
> ### AMD </summary>
 - > ###### Please bear with us, We have yet to test this. If you would like to discuss this documentation, add an Issue at the top menu of the page.

</details>

>
> ##
>
> ### Please continue your Windows Subsystem for Linux installation by following the [linux instructions](#linux)
>
> ##

</details>
</details>

<details><summary>
<a name="macos" />   

## MacOS <hr></summary>

1. > ###### Install [Xcode](https://apps.apple.com/us/app/xcode/id497799835)
2. > ###### Open `Terminal` and enter the following:
   > ```
   > xcode-select --install
3. > ###### Follow the [Python instructions](#linux)
</details></details>

<summary>

<a name="linux " />

## Linux<hr></summary>
1. > ### Update your repository and install upgrades
   > ###### - ***WSL***/Ubuntu/Debian:
   > ```
   > sudo apt-get -y update & sudo apt-get -y upgrade
   > ```

   > ###### - Redhat/Fedora:
   >  ```
   >  sudo dnf update & sudo dnf upgrade
   >  ```

   > ###### - Arch:
   >   ```
   >  sudo pacman -Syu
   > ```
   >
   > ##
<a name="python" />

2. > ### Create a virtual environment in your current directory
 ##
> [!NOTE]
>
> We recommend running this command from an easy to remember location while avoiding `/home`, `/Program Files`, `/Windows`, and other protected directories.
> ```
> python3 -m venv .venv
> ```
##

3. > ### Activate the environment

   > ##### - Windows
   > ```
   > .venv\Scripts\activate
   > ```
   
   > ##### - Linux, MacOS and WSL
   > ```
   > source .venv/bin/activate
   > ```
   > ##
3. > ### Install PyTorch
   > ###### - NVIDIA: 
   > ```
   > pip3 install torch==2.3.0+cu121 torchvision --index-url=https://download.pytorch.org/whl/cu121
   > ```
   
   > ###### - AMD Linux: 
   > ```
   > pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm6.0
   > ```

   > ##### - AMD Windows:
   > ``` 
   > pip install torch-directml
   > ```
   
   > ###### - MacOS/CPU:
   > ```
   > pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cpu
   > ```

##

<a name="sabre" />

### SabreUI

5. > ### Once PyTorch and Friends are installed, run this command to install Sabre to your current directory.
   > ```
   >  git clone https://github.com/MaxTretikov/ComfyUI.git
   >  ```
   > ##### Extended functionality of [ComfyUI](https://github.com/comfyanonymous/ComfyUI) will also allow you to run SabreUI from command line.
##
6. > ### Install the last requirements
   > ```
   > cd ComfyUI
   > pip install -r requirements.txt
   > ```
##
7. ### Launch SabreUI
   > ```
   > python main.py --output-directory /YOUR_FOLDER_NAME --input-directory /YOUR_FOLDER_NAME/input
   > ```
   
   > ##### AMD DIRECTML
   > ```
   > python main.py --directml --output-directory /YOUR_FOLDER_NAME --input-directory /YOUR_FOLDER_NAME/input
   > ```
   
   > ##### OLDER COMPUTERS
   > ```
   > python main.py --force-fp16 --output-directory /YOUR_FOLDER_NAME --input-directory /YOUR_FOLDER_NAME/input
   > ```
##

8. > ### Open your browser to [127.0.0.1:8188](https://127.0.0.1:8188) and Choose SabreUI from the settings menu 

# Done!
<details><summary>

- Linux/WSL Developer Notes

</summary>

 - > ##### Install build tools. WSL users should run in a Visual Studio Code prompt environment.
   > ```
   > pip install packaging wheel ninja
   > ```
- >  ##### Install xformers
   > ```
   > pip install xformers==0.0.26.post1
   > ```
   > ##
- > ##### Install flash-attention
   > ```
   > pip install flash-attn --no-build-isolation
   > ```
</details>

##

<div align="right">
<sub>Lets create a more inviting and visually-pleasing ComfyUI Frontend using Typescript and ReactFlow!</sub></div>
