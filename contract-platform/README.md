# Contract Management Platform

A frontend-based Contract Management Platform built with **Next.js**, **TypeScript**, and **Zustand**. This application allows users to design contract blueprints, generate contract instances, and manage their lifecycle through a dashboard.

## Features

- **Blueprint Creation**: Design templates with dynamic fields (Text, Date, Checkbox).
- **Contract Generation**: Instantiate contracts from saved blueprints.
- **Lifecycle Management**: Track contract status (Created → Signed).
- **Dashboard**: A unified view to filter and manage all contracts.

## 🛠 Tech Stack & Architecture Decisions

| Technology | Usage | Justification |
| :--- | :--- | :--- |
| **Next.js 14 (App Router)** | Framework | Provides robust routing and server-side capabilities for future scaling. |
| **TypeScript** | Language | Ensures type safety, critical for handling strict contract data structures. |
| **Zustand** | State Management | Selected over Redux for its lightweight footprint and simple boilerplate-free API, perfect for this scope. |
| **Tailwind CSS** | Styling | Chosen for rapid UI development and consistent design tokens without writing custom CSS. |
| **Lucide React** | Icons | Clean, modern SVG icons to enhance UI clarity. |

### Architecture
- **Store (`src/store`)**: Centralized state for Blueprints and Contracts using Zustand. Decoupled from UI components.
- **Types (`src/types`)**: Shared interfaces ensure data consistency across the app.
- **Components**: Split into `layout` (Sidebar) and feature-specific pages for modularity.

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <YOUR_REPO_LINK_HERE>
   cd contract-platform
