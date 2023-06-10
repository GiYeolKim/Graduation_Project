# SynthView Generator
![image](https://github.com/agtmwebtoon/gachon-graduation-project/assets/50310635/cf6c089c-297e-49e1-a1dc-8f1e8fc5dfbb)
This is a Flask application that allows users to upload videos and perform video processing tasks using the COLMAP and NeRF libraries. The processed videos can be downloaded by the users.

## Prerequisites

Before running the application, ensure that you have the following dependencies installed:
- Python 3
- Flask
- Flask-SSE
- Redis
- COLMAP
- NeRF

You can install the required Python packages by running the following command:

```

pip install -r requirements.txt
```



Additionally, make sure you have Redis server installed and running. Update the `REDIS_URL` in the `app.config` section of the code to match your Redis server URL.
## Usage
1. Clone the repository:

```bash

git clone https://github.com/your-username/flask-video-processing.git
```


1. Navigate to the project directory:

```bash

cd flask-video-processing
```


1. Start the Flask application:

```

python app.py
```



The application will run on `http://localhost:5000` by default. 
1. Access the application in your web browser and upload a video file. 
2. Wait for the processing to complete. You will see log messages indicating the progress. 
3. Once the processing is finished, you can download the processed video.
## Project Structure

The project structure is as follows:

```css

flask-video-processing/
  |- scripts/
     |- colmap2nerf.py
     |- run.py
  |- static/
     |- css/
        |- main.css
     |- js/
        |- main.js
  |- templates/
     |- index.html
  |- app.py
  |- base_cam.json
  |- requirements.txt
  |- readme.md
```

 
- The `scripts` directory contains the Python scripts for video processing using COLMAP and NeRF. 
- The `static` directory contains the CSS and JavaScript files for the frontend. 
- The `templates` directory contains the HTML template for the application's UI. 
- The `app.py` file is the main Flask application file. 
- The `base_cam.json` file is a configuration file for camera settings. 
- The `requirements.txt` file lists the required Python packages. 
- The `readme.md` file is the documentation file.
## Contributing

If you want to contribute to this project, you can follow these steps: 
1. Fork the repository. 
2. Create a new branch:

```bash

git checkout -b feature/your-feature
```

# Team Members

This project is developed and maintained by the following team members:
## Giyeol Kim

He is responsible for coordinating the project, managing tasks, and ensuring timely completion of milestones. He also oversees the overall development process and ensures effective communication within the team.
## Minhyung Lee

He is responsible for designing and implementing the server-side logic of the application. He works on data processing, API development, and integration with external services.
## Gio Kim
He is a skilled frontend developer who handles the user interface and client-side development of the application. He is responsible for creating responsive and user-friendly interfaces using HTML, CSS, and JavaScript frameworks.
