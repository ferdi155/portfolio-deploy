import express from "express";
import pkg from "pg";
import multer from "multer";
import path from "path";
import { engine } from "express-handlebars";
import dotenv from "dotenv";

dotenv.config(); // ✅ HARUS di atas sebelum Pool digunakan

const { Pool } = pkg;
const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

console.log("DATABASE_URL =>", process.env.DATABASE_URL);

process.on("uncaughtException", err => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", err => {
  console.error("Unhandled Rejection:", err);
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowed = [".jpeg", ".jpg", ".png"];
  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Hanya file jpeg, jpg, png yang diperbolehkan"));
  }
};

const upload = multer({ storage, fileFilter });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public/image"));
app.use(express.static("public/script"));
app.use('/uploads', express.static(path.join(process.cwd(), 'public/uploads')));



app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/input", (req, res) => {
  res.render("input", { layout: false });
});

app.get('/contact', (req, res) => {
  res.render('contact', {layout: false });
});

app.post("/formProject", upload.single("image_url"), async (req, res) => {
  try {
    const { projectName, description, technologies, github } = req.body;
    const selectedTech = Array.isArray(technologies)
      ? technologies
      : technologies ? [technologies] : [];

    const image_url = req.file ? req.file.filename : null;

    await pool.query(
      `INSERT INTO form_project (project_name, description, technologies, github, image_url)
       VALUES ($1, $2, $3, $4, $5)`,
      [projectName, description, selectedTech, github, image_url]
    );

    res.redirect("/");
  } catch (err) {
    console.error("❌ Gagal simpan project:", err);
    res.status(500).send("Gagal menyimpan project");
  }
});


app.post("/experience", upload.single("logo"), async (req, res) => {
  try {
    const { position, location, description, startDate, endDate, technologies } = req.body;

    const selectedTech = Array.isArray(technologies)
      ? technologies
      : technologies ? [technologies] : [];

    const logo = req.file ? req.file.filename : null;

    await pool.query(
      `INSERT INTO experience (position, location, description, start_date, end_date, technologies, logo)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [position, location, description, startDate, endDate, selectedTech, logo]
    );

    res.redirect("/");
  } catch (err) {
    console.error("❌ Gagal simpan experience:", err);
    res.status(500).send("Gagal menyimpan experience");
  }
});

app.get("/", async (req, res) => {
  try {
        const projectResult = await pool.query("SELECT * FROM form_project ORDER BY id DESC");
    const projects = projectResult.rows.map((p) => ({
      ...p,
      technologies: typeof p.technologies === "string"
        ? p.technologies.replace(/[{}"]/g, "").split(",").filter(Boolean)
        : p.technologies || [],
      image_url: p.image_url ? `/uploads/${p.image_url}` : null,
    }));

    const expResult = await pool.query("SELECT * FROM experience ORDER BY id DESC");
    const experiences = expResult.rows.map((exp) => {
      const start = new Date(exp.start_date).toLocaleDateString("id-ID", { month: "short", year: "numeric" });
      const end = new Date(exp.end_date).toLocaleDateString("id-ID", { month: "short", year: "numeric" });

      return {
        ...exp,
        description: exp.description ? exp.description.split("\n") : [],
        start_date: start,
        end_date: end,
        technologies: typeof exp.technologies === "string"
          ? exp.technologies.replace(/[{}"]/g, "").split(",").filter(Boolean)
          : exp.technologies || [],
        logo: exp.logo ? `/uploads/${exp.logo}` : "/default-logo.png",
      };
    });

    res.render("home", {
      layout: false,
      projects,
      experiences,
    });
  } catch (err) {
    console.error("❌ Gagal load halaman utama:", err);
    res.status(500).send("Gagal menampilkan data");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
