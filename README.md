# Divine POS Internal README

Welcome to the internal development repository for Divine POS, an enterprise-level Point of Sale (POS) system developed using React Native by Micton Web Design Inc. This README provides essential information about the project's structure, setup instructions, contribution guidelines, and our internal licensing agreement.

## Project Structure

- **`assets/`**: Global assets for the project, including images, stylesheets, and fonts.
- **`components/`**: Reusable UI components.
- **`functions/`**: Firebase Cloud Function files and related packages.
- **`navigation/`**: Routing logic, divided into authenticated (`authed`) and unauthenticated (`non-authed`) flows.
- **`pages/`**: Application pages, organized by authentication status and further divided for different user roles.
- **`state/`**: Firebase configurations and global state management.
- **`web/`**: Files for web application development.
- **`web-build/`**: Output files for the web version, generated upon build.

## Prerequisites

- Node.js (latest stable version)
- npm (comes with Node.js)
- Firebase CLI (for deploying Cloud Functions)

## Setup and Running

1. Clone the repository to your local machine.
2. Run `npm i` to install dependencies.
3. Execute `npm start` to launch locally.
4. Use `npm run build` for production builds.

## Contributing to Divine POS

As this repository is intended for internal development, we encourage contributions from all team members. To maintain code quality and consistency:

- Discuss major changes via issues before implementation.
- Follow the established coding and documentation standards.
- Update or add tests as necessary.

## License for Internal Use

This repository contains proprietary software owned by Micton Web Design Inc. Access to and use of Divine POS, including all code, documentation, and related materials, are provided under a specific internal use license. This license grants team members the right to work on the software with the understanding that:

- The software and its components remain the intellectual property of Micton Web Design Inc.
- Redistribution or use outside the scope of internal development is strictly prohibited without express permission.
- All contributions to the repository are subject to the terms of this internal use license.

## Contact Information

For any questions or support related to Divine POS development, please contact:

- Phone: 1 (833) 348-7671
- Email: support@divinepos.com
