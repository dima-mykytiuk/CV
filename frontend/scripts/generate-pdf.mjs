import PDFDocument from "pdfkit";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import resumeData from "../src/resumeData.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");

/* ═══════════════════  FONTS  ═══════════════════ */
const FONT_R = "/System/Library/Fonts/Supplemental/Arial.ttf";
const FONT_B = "/System/Library/Fonts/Supplemental/Arial Bold.ttf";

if (!fs.existsSync(FONT_R) || !fs.existsSync(FONT_B)) {
  console.error("Required system fonts not found (Arial). Adjust FONT_R / FONT_B paths.");
  process.exit(1);
}

/* ═══════════════════  COLORS  ═══════════════════ */
const CL = {
  dark: "#1a2332",
  body: "#2d3436",
  accent: "#2b5c8a",
  link: "#1a5276",
  white: "#ffffff",
  lightBorder: "#dde4eb",
};

/* ═══════════════════  LAYOUT  ═══════════════════ */
const PW = 595.28; // A4 width in pts
const PH = 841.89;
const M = 32; // page margin
const LX = M; // left-column x
const LW = 152; // left-column width
const COL_GAP = 16;
const RX = LX + LW + COL_GAP; // right-column x
const RW = PW - RX - M; // right-column width

/* ═══════════════════  ICON HELPERS  ═══════════════════ */
function drawPersonIcon(doc, cx, cy, s, color) {
  doc.save().fillColor(color);
  doc.circle(cx, cy - s * 0.15, s * 0.19).fill();
  doc
    .moveTo(cx - s * 0.3, cy + s * 0.32)
    .bezierCurveTo(cx - s * 0.3, cy + 0, cx + s * 0.3, cy + 0, cx + s * 0.3, cy + s * 0.32)
    .closePath()
    .fill();
  doc.restore();
}

function drawStarIcon(doc, cx, cy, s, color) {
  doc.save().fillColor(color);
  const outer = s * 0.42,
    inner = outer * 0.42;
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  doc.moveTo(...pts[0]);
  pts.slice(1).forEach((p) => doc.lineTo(...p));
  doc.closePath().fill();
  doc.restore();
}

function drawBriefcaseIcon(doc, cx, cy, s, color) {
  doc.save().fillColor(color);
  const bw = s * 0.68,
    bh = s * 0.44;
  doc.roundedRect(cx - bw / 2, cy - bh / 2 + s * 0.06, bw, bh, 1.5).fill();
  const hw = s * 0.26,
    hh = s * 0.16;
  doc.rect(cx - hw / 2, cy - bh / 2 - hh + s * 0.1, hw, hh).fill();
  doc.restore();
}

function drawGradCapIcon(doc, cx, cy, s, color) {
  doc.save().fillColor(color);
  const half = s * 0.46;
  doc
    .moveTo(cx, cy - s * 0.25)
    .lineTo(cx + half, cy + s * 0.04)
    .lineTo(cx, cy + s * 0.2)
    .lineTo(cx - half, cy + s * 0.04)
    .closePath()
    .fill();
  doc.lineWidth(0.8).strokeColor(color);
  doc
    .moveTo(cx + half * 0.78, cy + s * 0.04)
    .lineTo(cx + half * 0.78, cy + s * 0.32)
    .stroke();
  doc.circle(cx + half * 0.78, cy + s * 0.36, 1).fill();
  doc.restore();
}

function drawGearIcon(doc, cx, cy, s, color) {
  doc.save().fillColor(color);
  const r = s * 0.26;
  doc.circle(cx, cy, r).fill();
  const teeth = 8,
    tr = r + s * 0.1;
  for (let i = 0; i < teeth; i++) {
    const a = (Math.PI * 2 * i) / teeth;
    doc.circle(cx + tr * Math.cos(a), cy + tr * Math.sin(a), s * 0.08).fill();
  }
  doc.fillColor(CL.white).circle(cx, cy, r * 0.35).fill();
  doc.restore();
}

function drawLocationPin(doc, x, y, color) {
  doc.save().fillColor(color);
  doc.circle(x, y - 0.5, 2.2).fill();
  doc
    .moveTo(x - 1.7, y + 0.5)
    .lineTo(x, y + 4)
    .lineTo(x + 1.7, y + 0.5)
    .closePath()
    .fill();
  doc.fillColor(CL.white).circle(x, y - 0.5, 0.8).fill();
  doc.restore();
}

function drawPhoneIcon(doc, x, y, color) {
  doc.save().fillColor(color);
  doc.roundedRect(x - 2, y - 3.5, 4, 7, 1).fill();
  doc.fillColor(CL.white);
  doc.rect(x - 1, y - 2.5, 2, 2.2).fill();
  doc.rect(x - 1, y + 1.2, 2, 1.5).fill();
  doc.restore();
}

const ICON_FNS = {
  person: drawPersonIcon,
  star: drawStarIcon,
  briefcase: drawBriefcaseIcon,
  gradcap: drawGradCapIcon,
  gear: drawGearIcon,
};

/* ═══════════════════  SECTION HEADER HELPERS  ═══════════════════ */

function drawLeftHeader(doc, title, y) {
  const sz = 9.5;
  doc.font("Bold").fontSize(sz).fillColor(CL.dark);
  const text = title.toUpperCase();
  const tw = doc.widthOfString(text);
  const cx = LX + LW / 2;
  const dr = 2.2,
    gap = 5;
  const midY = y + sz * 0.35;
  doc.save().lineWidth(0.75).strokeColor(CL.accent);
  doc.circle(cx - tw / 2 - gap - dr, midY, dr).stroke();
  doc.circle(cx + tw / 2 + gap + dr, midY, dr).stroke();
  doc.restore();
  doc.text(text, LX, y, { width: LW, align: "center" });
  return doc.y + 5;
}

function drawRightHeader(doc, title, iconKey, y) {
  const sz = 12;
  const iconS = 13;
  const iconGap = 7;
  ICON_FNS[iconKey](doc, RX + iconS / 2, y + sz * 0.42, iconS, CL.accent);
  doc.font("Bold").fontSize(sz).fillColor(CL.dark);
  doc.text(title.toUpperCase(), RX + iconS + iconGap, y, { width: RW - iconS - iconGap });
  return doc.y + 5;
}

/* ═══════════════════  HEADER  ═══════════════════ */

function renderHeader(doc, profile) {
  let y = M;

  // Name
  doc.font("Bold").fontSize(24).fillColor(CL.dark);
  doc.text(profile.name.toUpperCase(), M, y, {
    width: PW - 2 * M,
    align: "center",
    characterSpacing: 2.5,
  });
  y = doc.y + 5;

  // Subtitle with icons
  doc.font("Regular").fontSize(8.5).fillColor(CL.body);

  const titleStr = profile.title.toUpperCase();
  const locStr = profile.location.toUpperCase();
  const phoneStr = profile.phone;

  const titleW = doc.widthOfString(titleStr);
  const locW = doc.widthOfString(locStr);
  const phoneW = doc.widthOfString(phoneStr);

  const iconW = 8;
  const iconGap = 4;
  const groupGap = 14;

  const totalW = titleW + groupGap + iconW + iconGap + locW + groupGap + iconW + iconGap + phoneW;
  let sx = (PW - totalW) / 2;

  doc.text(titleStr, sx, y, { lineBreak: false });
  sx += titleW + groupGap;

  drawLocationPin(doc, sx + iconW / 2, y + 3.5, CL.body);
  sx += iconW + iconGap;
  doc.text(locStr, sx, y, { lineBreak: false });
  sx += locW + groupGap;

  drawPhoneIcon(doc, sx + iconW / 2, y + 3.5, CL.body);
  sx += iconW + iconGap;
  doc.text(phoneStr, sx, y, { lineBreak: false });

  y += 14;

  // Separator line
  doc.save().lineWidth(0.5).strokeColor(CL.lightBorder);
  doc.moveTo(M, y).lineTo(PW - M, y).stroke();
  doc.restore();
  y += 18;

  return y;
}

/* ═══════════════════  LEFT COLUMN SECTIONS  ═══════════════════ */

function renderContact(doc, profile, ui, y) {
  y = drawLeftHeader(doc, ui.contact, y);

  const [city, country] = profile.location.includes(",")
    ? profile.location.split(",").map((s) => s.trim())
    : [profile.location, ""];

  doc.font("Regular").fontSize(8.5).fillColor(CL.body);
  doc.text(city, LX, y, { width: LW, align: "center" });
  y = doc.y;
  if (country) {
    doc.text(country, LX, y, { width: LW, align: "center" });
    y = doc.y;
  }

  doc.fillColor(CL.link);
  doc.text(profile.phone, LX, y, {
    width: LW,
    align: "center",
    link: `tel:${profile.phone}`,
    underline: true,
  });
  y = doc.y;
  doc.text(profile.email, LX, y, {
    width: LW,
    align: "center",
    link: `mailto:${profile.email}`,
    underline: true,
  });
  return doc.y + 14;
}

function renderLinks(doc, links, ui, y) {
  y = drawLeftHeader(doc, ui.links, y);
  for (const link of links) {
    doc.font("Regular").fontSize(8.5).fillColor(CL.link);
    doc.text(link.label, LX, y, {
      width: LW,
      align: "center",
      link: link.url,
      underline: true,
    });
    y = doc.y + 1;
  }
  return y + 12;
}

function renderCenteredList(doc, title, items, y) {
  y = drawLeftHeader(doc, title, y);
  for (const item of items) {
    doc.font("Regular").fontSize(8.5).fillColor(CL.body);
    doc.text(item, LX, y, { width: LW, align: "center" });
    y = doc.y + 1;
  }
  return y + 12;
}

/* ═══════════════════  RIGHT COLUMN SECTIONS  ═══════════════════ */

function renderSummary(doc, summary, ui, y) {
  y = drawRightHeader(doc, ui.summary, "person", y);
  const dotIdx = summary.indexOf(". ");
  if (dotIdx > 0) {
    const first = summary.slice(0, dotIdx + 2);
    const rest = summary.slice(dotIdx + 2);
    doc.font("Bold").fontSize(9).fillColor(CL.body);
    doc.text(first, RX, y, { width: RW, lineGap: 2, continued: true });
    doc.font("Regular");
    doc.text(rest, { width: RW, lineGap: 2 });
  } else {
    doc.font("Regular").fontSize(9).fillColor(CL.body);
    doc.text(summary, RX, y, { width: RW, lineGap: 2 });
  }
  return doc.y + 10;
}

function drawModulesIcon(doc, cx, cy, s, color) {
  doc.save().fillColor(color);
  const g = s * 0.12;
  const bs = (s * 0.7 - g) / 2;
  const ox = cx - (bs + g / 2);
  const oy = cy - (bs + g / 2);
  doc.roundedRect(ox, oy, bs, bs, 1).fill();
  doc.roundedRect(ox + bs + g, oy, bs, bs, 1).fill();
  doc.roundedRect(ox, oy + bs + g, bs, bs, 1).fill();
  doc.roundedRect(ox + bs + g, oy + bs + g, bs, bs, 1).fill();
  doc.restore();
}

function renderKeyModules(doc, modules, ui, y) {
  ICON_FNS["modules"] = drawModulesIcon;
  y = drawRightHeader(doc, ui.keyModules, "modules", y);

  // Render as a compact two-column grid
  const colGap = 10;
  const colW = (RW - colGap) / 2;
  const leftX = RX;
  const rightX = RX + colW + colGap;
  const half = Math.ceil(modules.length / 2);

  const startY = y;
  const lineH = 11;

  for (let i = 0; i < modules.length; i++) {
    const col = i < half ? 0 : 1;
    const row = i < half ? i : i - half;
    const x = col === 0 ? leftX : rightX;
    const iy = startY + row * lineH;

    doc.save().fillColor(CL.accent);
    doc.circle(x + 4, iy + 4, 1.5).fill();
    doc.restore();

    doc.font("Regular").fontSize(8).fillColor(CL.body);
    doc.text(modules[i], x + 10, iy, { width: colW - 10, lineBreak: false });
  }

  return startY + half * lineH + 6;
}

function renderProjects(doc, projects, ui, y) {
  y = drawRightHeader(doc, ui.projects, "star", y);
  for (const proj of projects) {
    // Teal bullet
    doc.save().fillColor(CL.accent);
    doc.circle(RX + 4, y + 5, 2).fill();
    doc.restore();

    const tx = RX + 14;
    const tw = RW - 14;
    doc.font("Bold").fontSize(9).fillColor(CL.body);
    doc.text(proj.title + ". ", tx, y, { width: tw, lineGap: 2, continued: true });
    doc.font("Regular");
    doc.text(proj.details, { width: tw, lineGap: 2 });
    y = doc.y + 4;
  }
  return y + 4;
}

function renderWorkHistory(doc, jobs, ui, y) {
  y = drawRightHeader(doc, ui.workHistory, "briefcase", y);
  for (const job of jobs) {
    // Teal timeline dot
    doc.save().fillColor(CL.accent);
    doc.circle(RX + 4, y + 5, 2.5).fill();
    doc.restore();

    const tx = RX + 14;
    const tw = RW - 14;

    doc.font("Bold").fontSize(9.5).fillColor(CL.dark);
    doc.text(`${job.role} ${ui.at} ${job.company}, ${job.city}`, tx, y, { width: tw });
    y = doc.y + 1;

    doc.font("Regular").fontSize(8.5).fillColor(CL.accent);
    doc.text(job.period, tx, y, { width: tw });
    y = doc.y + 2;

    if (job.details) {
      doc.font("Regular").fontSize(9).fillColor(CL.body);
      doc.text("•  " + job.details, tx + 6, y, { width: tw - 6, lineGap: 2 });
      y = doc.y;
    }
    y += 6;
  }
  return y + 4;
}

function renderEducation(doc, items, ui, y) {
  y = drawRightHeader(doc, ui.education, "gradcap", y);
  for (const item of items) {
    doc.save().fillColor(CL.accent);
    doc.circle(RX + 4, y + 5, 2.5).fill();
    doc.restore();

    const tx = RX + 14;
    const tw = RW - 14;

    doc.font("Bold").fontSize(9.5).fillColor(CL.dark);
    doc.text(`${item.degree}, ${item.institution}`, tx, y, { width: tw });
    y = doc.y + 1;

    doc.font("Regular").fontSize(8.5).fillColor(CL.accent);
    doc.text(item.period, tx, y, { width: tw });
    y = doc.y + 6;
  }
  return y + 4;
}

function renderCourses(doc, courses, ui, y) {
  y = drawRightHeader(doc, ui.courses, "gear", y);
  for (const course of courses) {
    doc.save().fillColor(CL.accent);
    doc.circle(RX + 4, y + 5, 2.5).fill();
    doc.restore();

    const tx = RX + 14;
    const tw = RW - 14;

    doc.font("Bold").fontSize(9.5).fillColor(CL.dark);
    doc.text(`${course.title}, ${course.provider}`, tx, y, { width: tw });
    y = doc.y + 1;

    doc.font("Regular").fontSize(8.5).fillColor(CL.accent);
    doc.text(course.period, tx, y, { width: tw });
    y = doc.y + 8;
  }
  return y;
}

/* ═══════════════════  MAIN  ═══════════════════ */

function generateResume(lang) {
  const resume = resumeData.resumes[lang];
  const ui = resumeData.ui[lang];
  const { profile } = resume;

  const doc = new PDFDocument({
    size: "A4",
    margins: { top: M, bottom: M, left: M, right: M },
    info: {
      Title: `${profile.name} – ${profile.title}`,
      Author: profile.name,
    },
  });

  const outPath = path.join(ROOT, `resume-${lang}.pdf`);
  const stream = fs.createWriteStream(outPath);
  doc.pipe(stream);

  doc.registerFont("Regular", FONT_R);
  doc.registerFont("Bold", FONT_B);

  /* ---- header ---- */
  const colStartY = renderHeader(doc, profile);

  /* ---- left column ---- */
  let ly = colStartY;
  ly = renderContact(doc, profile, ui, ly);
  ly = renderLinks(doc, resume.links, ui, ly);
  ly = renderCenteredList(doc, ui.professionalSkills, resume.skills, ly);
  ly = renderCenteredList(doc, ui.personalQualities, resume.qualities, ly);
  ly = renderCenteredList(doc, ui.languages, resume.languages, ly);

  /* ---- right column ---- */
  let ry = colStartY;
  ry = renderSummary(doc, resume.summary, ui, ry);
  ry = renderKeyModules(doc, resume.keyModules, ui, ry);
  ry = renderProjects(doc, resume.projects, ui, ry);
  ry = renderWorkHistory(doc, resume.workHistory, ui, ry);
  ry = renderEducation(doc, resume.education, ui, ry);
  ry = renderCourses(doc, resume.courses, ui, ry);

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on("finish", () => {
      console.log(`  ✓  ${outPath}`);
      resolve();
    });
    stream.on("error", reject);
  });
}

/* ---- entry ---- */
console.log("Generating resume PDFs …\n");
await generateResume("en");
await generateResume("uk");
console.log("\nDone!");
