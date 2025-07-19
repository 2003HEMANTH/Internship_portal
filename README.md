# Internship Portal

A modern Internship Portal web application built with Next.js, Bun, and Prisma. This project provides a platform for students to find internships and for companies to manage internship postings efficiently.

---

## 🚀 Features

- Student and company authentication
- Internship listings and applications
- Certificate management
- Responsive UI with reusable components
- Modern tech stack: Next.js, Bun, Prisma, Tailwind CSS

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React, TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Next.js API routes
- **Database ORM:** Prisma
- **Database:** (Configure in `.env`)
- **Package Manager:** Bun

---

## 📦 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- [Node.js](https://nodejs.org/) (if needed for compatibility)
- [PostgreSQL](https://www.postgresql.org/) or your preferred database

### 1. Clone the repository

```sh
git clone https://github.com/your-username/internship-portal.git
cd internship-portal
```

### 2. Install dependencies

```sh
bun install
```

### 3. Configure environment variables

Create a `.env` file in the root directory and add your database and other secrets:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
# Add other environment variables as needed
```

### 4. Set up the database

```sh
bunx prisma migrate dev --name init
```

### 5. Run the development server

```sh
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📁 Folder Structure

```
app/                # Next.js app directory (pages, API routes)
components/         # Reusable React components
hooks/              # Custom React hooks
lib/                # Utilities and database helpers
prisma/             # Prisma schema and migrations
public/             # Static assets
styles/             # Global styles
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📬 Contact

For questions or support, open an issue or contact [hemanth9886609@gmail.com]
