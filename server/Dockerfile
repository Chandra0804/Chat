# Use the official Node.js image as a base
FROM node:18

# Set the working directory in the container for the server
WORKDIR /server

# Copy package.json and package-lock.json to the container for the server
COPY package*.json ./

# Install dependencies for the server
RUN npm install

# Copy the rest of the application code to the container for the server
COPY . .

# Install Python and create a virtual environment
RUN apt-get update && apt-get install -y python3 python3-pip
RUN python3 -m venv venv

# Activate the virtual environment and install Python dependencies for the Flask app
RUN . venv/bin/activate && pip3 install -r requirements.txt

# Expose ports for Node.js server and Flask app
EXPOSE 3000
EXPOSE 5000

# Command to run both the Node.js server and the Flask app
CMD ["npm", "start", "&", "venv/bin/python3", "app.py"]
