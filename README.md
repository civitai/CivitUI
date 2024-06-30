

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
<a name="windows">
  
##
<details><summary>

  ## Windows<hr></summary>
  
 #### Installing WSL (Windows Subsystem for Linux)
> 1. ######  Allow WSL through your firewall using Powershell with the following command in CMD:
> ```
> powershell New-NetFirewallRule -Program “%SystemRoot%\System32\wsl.exe” -Action Allow -Profile Domain, Private -DisplayName “Allow WSL” > -Description “Allow WSL” -Direction Outbound
> ```
> 2. ###### Enable Control Flow Guard
> ```
> powershell Set-ProcessMitigation -Name vmcompute.exe -Enable CFG
> ```
> 3. ###### a. [Download And Install Ubuntu LTS for WSL](https://learn.microsoft.com/en-us/windows/wsl/install-manual#downloading-distributions) 
> ###### OR 
> 3. ###### b. Download and Install Ubuntu LTS with Windows Subsystem for Linux from Command Line
> ```
> wsl --install -d Ubuntu --web-download
> ```
> 4. ###### Open WSL
> ```
> wsl
> ```
> 5. ###### Ensure Latest Python and Git
> ```
> sudo apt-get -y install python3 python3-venv python3-pip git
> ```
> 6. ##### Dedicate more system RAM by making a .wslconfig file. Follow [these instructions from Microsoft](https://learn.microsoft.com/en-us/windows/wsl/wsl-config#example-wslconfig-file)
> 
> ###### Next, choosing your graphics card type below
> <details><summary>
> 
>### NVIDIA </summary>
> 1. ###### a. Get NVIDIA keys
>  ```
> wget https://developer.download.nvidia.com/compute/cuda/repos/wsl-ubuntu/x86_64/cuda-keyring_1.1-1_all.deb
>  ```
> **OR**
> 1. ###### b. Add NVIDIA to your repository sources
> ```
> sudo 'echo "http://developer.download.nvidia.com/compute/cuda/repos/wsl-ubuntu/x86_64 /" > /etc/apt/sources.list.d/cuda.list'
> ```
> 2. ###### Install Key
> ```
> sudo dpkg -i cuda-keyring_1.1-1_all.deb
> ```
>
> 3. ###### Install **CUDA-TOOLKIT**
> ```
> sudo apt-get -y install cuda-toolkit-12-5
> ```
> </details>
> <details><summary>
>
> ### AMD </summary>
> 
> - ###### Please bear with us, We have yet to test this. If you would like to discuss this documentation, add an Issue at the top menu of the page.
> </details>
>
> ##
> Please continue your Windows Subsystem for Linux installation by following the *[linux instructions](#linux)*
> ##

</details>

<details><summary>
<a name="macos" />   

## MacOS <hr></summary>

> 1. ###### Install [Xcode]https://apps.apple.com/us/app/xcode/id497799835
>   
> 2. ###### Follow Apple's instructions [Pytorch Install Instructions](https://developer.apple.com/metal/pytorch/)
>
> 3. ###### Follow the [Linux instructions](#linux)
</details></details>

<summary>

<a name="linux " />

## Linux<hr></summary>
1. ### Update your repository and install upgrades

###### - ***WSL***/Ubuntu/Debian:
>  ```
> sudo apt-get -y update & sudo apt-get -y upgrade
> ```

###### - Redhat/Fedora:
>  ```
>  sudo dnf update & sudo dnf upgrade
>  ```

###### - Arch:
>   ```
>  sudo pacman -Syu
> ```
##
2. ### Create a virtual environment in your current directory

> [!NOTE]
>
> We recommend running this command from an easy to remember location while avoiding `/home`, `/Program Files`, `/Windows`, and other protected directories.
##
```
python3 -m venv .venv
```
##
3. ### Activate the environment
```
source .venv/bin/activate
```
##
4. ### Install prerequisites
```
pip install packaging wheel ninja
```
##
5. ### Install PyTorch
###### - NVIDIA: 
```
pip3 install torch==2.3.0+cu121 torchvision --index-url=https://download.pytorch.org/whl/cuda121
```
###### - AMD: 
```
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm6.0
```
##
6. ### Install XFORMERS (Unavaiable for Legacy Windows Install)

```
pip install xformers==0.0.26.post1
```
##
7. ### Install Flash-attention (Unavailable for Legacy Windows Install)
```
pip install flash-attn --no-build-isolation
```
##
<a name="sabre" />

### SabreUI

### Once PyTorch and Friends are installed, run this command to install Sabre to your current directory.
> ```
>  git clone https://github.com/MaxTretikov/ComfyUI.git
>  ```
##### Extended functionality of [ComfyUI](https://github.com/comfyanonymous/ComfyUI) will also allow you to run SabreUI from command line.
##
8. ### Install the last requirements
```
cd ComfyUI
pip install -r requirements.txt
```
##
9. ### Launch SabreUI
```
python ComfyUI\main.py --output-directory /YOUR_FOLDER_NAME --input-directory /YOUR_FOLDER_NAME/input
```
##
10. ### Open your browser to [127.0.0.1:8188](https://127.0.0.1:8188) and Choose SabreUI from the settings menu 

# Done!


<details><summary>
 
  #### Legacy Windows Manual Installation </summary>

> ##### Many back-end features are unavailable for Windows devices when using [manual installation](#manual). We highly recommend using *[Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/install-manual#downloading-distributions/) (WSL)* unless otherwise prevented.
> 1. ###### Download [Python](https://www.python.org/downloads/windows/)
> 2. ###### Check the boxes for `Install For All` users and `Add Python.exe to PATH` in the installer
>
>   ![Screenshot 2024-06-29 161256](https://github.com/MaxTretikov/SabreUI/assets/91800957/9071ae92-1d6e-41a6-82e3-dbb6bdfd94b2)
>
> 3. ###### Download [Git](https://git-scm.com/download/win)
> 4. ###### In the installer, ensure the Git LFS box is marked
>
>    ![snip](https://github.com/MaxTretikov/SabreUI/assets/91800957/7e95f13b-e894-4499-a551-6389b62bfab6)
>
> 5. ###### Set Git to be usable from Windows Command line
>
>    ![Screenshot 2024-06-29 192323](https://github.com/MaxTretikov/SabreUI/assets/91800957/65171ec1-3b3f-4de4-b163-98607e4386fd)
>
> 6. ###### Use Windows' default console window
>
>    ![Screenshot 2024-06-29 192409](https://github.com/MaxTretikov/SabreUI/assets/91800957/850d0437-db37-4358-872b-956e9d417645)
> 
>> ###### The remainder of the installation instructions are the same, but to activate your .venv use this command in the directory you run the `python -m venv .venv` command in
> ```
> .venv/Scripts/activate
> ```
>
> ###### - AMD users installing this way should be sure to install DirectML:
> ```
> pip install torch-directml
> ```
</details>

<div align="right">
<sub>Lets create a more inviting and visually-pleasing ComfyUI Frontend using Typescript and ReactFlow!</sub></div>
