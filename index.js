var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// shared/schema.ts
import { z } from "zod";
import { pgTable, text, integer, boolean, timestamp, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
var UserRoleSchema, users, loginAttempts, usersRelations, loginAttemptsRelations, insertUserSchema, insertLoginAttemptSchema, LoginRequestSchema, RegisterRequestSchema, SecurityQuestionsVerifySchema, ResetPasswordSchema, AuthResponseSchema, MediaTypeSchema, FitModeSchema, GalleryItemSchema, InsertGalleryItemSchema, PlaylistItemSchema, InsertPlaylistItemSchema, MediaItemSchema, InsertMediaItemSchema, TextOverlaySchema, InsertTextOverlaySchema, ThemeSchema, InsertThemeSchema, PlaylistSchema, InsertPlaylistSchema, AppSettingsSchema, InsertAppSettingsSchema, ExportDataSchema, AnnouncementTypeSchema, AnnouncementSchema, InsertAnnouncementSchema, UserSettingsSchema, SupportTicketStatusSchema, SupportTicketSchema, InsertSupportTicketSchema, UpdateSupportTicketSchema;
var init_schema = __esm({
  "shared/schema.ts"() {
    "use strict";
    UserRoleSchema = z.enum(["admin", "user"]);
    users = pgTable("users", {
      id: serial("id").primaryKey(),
      email: text("email").notNull().unique(),
      username: text("username").notNull().unique(),
      phone: text("phone").notNull(),
      passwordHash: text("password_hash").notNull(),
      role: text("role", { enum: ["admin", "user"] }).notNull().default("user"),
      securityQuestion1: text("security_question_1").notNull(),
      securityAnswer1: text("security_answer_1").notNull(),
      securityQuestion2: text("security_question_2").notNull(),
      securityAnswer2: text("security_answer_2").notNull(),
      securityQuestion3: text("security_question_3").notNull(),
      securityAnswer3: text("security_answer_3").notNull(),
      isBlocked: boolean("is_blocked").notNull().default(false),
      failedAttempts: integer("failed_attempts").notNull().default(0),
      lastFailedAttempt: timestamp("last_failed_attempt"),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    loginAttempts = pgTable("login_attempts", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").references(() => users.id),
      email: text("email").notNull(),
      ipAddress: text("ip_address"),
      success: boolean("success").notNull(),
      userAgent: text("user_agent"),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    usersRelations = relations(users, ({ many }) => ({
      loginAttempts: many(loginAttempts)
    }));
    loginAttemptsRelations = relations(loginAttempts, ({ one }) => ({
      user: one(users, {
        fields: [loginAttempts.userId],
        references: [users.id]
      })
    }));
    insertUserSchema = createInsertSchema(users).omit({
      id: true,
      createdAt: true,
      updatedAt: true,
      passwordHash: true,
      failedAttempts: true,
      lastFailedAttempt: true,
      isBlocked: true,
      securityAnswer1: true,
      securityAnswer2: true,
      securityAnswer3: true
    }).extend({
      password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
      securityAnswer1: z.string().min(1, "Resposta obrigat\xF3ria"),
      securityAnswer2: z.string().min(1, "Resposta obrigat\xF3ria"),
      securityAnswer3: z.string().min(1, "Resposta obrigat\xF3ria")
    });
    insertLoginAttemptSchema = createInsertSchema(loginAttempts).omit({
      id: true,
      createdAt: true
    });
    LoginRequestSchema = z.object({
      identifier: z.string().min(1, "Email ou nome de usu\xE1rio obrigat\xF3rio"),
      password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres")
    });
    RegisterRequestSchema = z.object({
      email: z.string().email("Email inv\xE1lido"),
      username: z.string().min(3, "Usu\xE1rio deve ter pelo menos 3 caracteres"),
      phone: z.string().min(10, "Telefone deve ter pelo menos 10 d\xEDgitos"),
      password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
      confirmPassword: z.string().min(6, "Confirma\xE7\xE3o de senha obrigat\xF3ria"),
      securityQuestion1: z.string().min(1, "Pergunta de seguran\xE7a obrigat\xF3ria"),
      securityAnswer1: z.string().min(1, "Resposta obrigat\xF3ria"),
      securityQuestion2: z.string().min(1, "Pergunta de seguran\xE7a obrigat\xF3ria"),
      securityAnswer2: z.string().min(1, "Resposta obrigat\xF3ria"),
      securityQuestion3: z.string().min(1, "Pergunta de seguran\xE7a obrigat\xF3ria"),
      securityAnswer3: z.string().min(1, "Resposta obrigat\xF3ria")
    }).refine((data) => data.password === data.confirmPassword, {
      message: "As senhas n\xE3o coincidem",
      path: ["confirmPassword"]
    });
    SecurityQuestionsVerifySchema = z.object({
      identifier: z.string().min(1, "Email ou nome de usu\xE1rio obrigat\xF3rio"),
      answer1: z.string().min(1, "Resposta obrigat\xF3ria"),
      answer2: z.string().min(1, "Resposta obrigat\xF3ria"),
      answer3: z.string().min(1, "Resposta obrigat\xF3ria")
    });
    ResetPasswordSchema = z.object({
      identifier: z.string().min(1, "Email ou nome de usu\xE1rio obrigat\xF3rio"),
      answer1: z.string().min(1, "Resposta obrigat\xF3ria"),
      answer2: z.string().min(1, "Resposta obrigat\xF3ria"),
      answer3: z.string().min(1, "Resposta obrigat\xF3ria"),
      newPassword: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
      confirmNewPassword: z.string().min(6, "Confirma\xE7\xE3o de senha obrigat\xF3ria")
    }).refine((data) => data.newPassword === data.confirmNewPassword, {
      message: "As senhas n\xE3o coincidem",
      path: ["confirmNewPassword"]
    });
    AuthResponseSchema = z.object({
      token: z.string(),
      user: z.object({
        id: z.number(),
        email: z.string(),
        username: z.string(),
        role: UserRoleSchema,
        createdAt: z.date(),
        updatedAt: z.date()
      })
    });
    MediaTypeSchema = z.enum(["image", "video", "audio", "text"]);
    FitModeSchema = z.enum(["contain", "cover", "stretch", "crop"]);
    GalleryItemSchema = z.object({
      id: z.string(),
      type: MediaTypeSchema,
      name: z.string(),
      url: z.string().optional(),
      thumbnailUrl: z.string().optional(),
      duration: z.number().optional(),
      createdAt: z.number(),
      textContent: z.string().optional(),
      textTitle: z.string().optional(),
      textColor: z.string().optional(),
      textBackgroundColor: z.string().optional(),
      textBold: z.boolean().optional(),
      textItalic: z.boolean().optional(),
      textUnderline: z.boolean().optional(),
      textSize: z.number().optional(),
      formattedContent: z.string().optional()
    });
    InsertGalleryItemSchema = GalleryItemSchema.omit({ id: true, createdAt: true });
    PlaylistItemSchema = z.object({
      id: z.string(),
      galleryItemId: z.string(),
      order: z.number(),
      addedAt: z.number()
    });
    InsertPlaylistItemSchema = PlaylistItemSchema.omit({ id: true, addedAt: true });
    MediaItemSchema = GalleryItemSchema.extend({
      order: z.number()
    });
    InsertMediaItemSchema = MediaItemSchema.omit({ id: true, createdAt: true });
    TextOverlaySchema = z.object({
      id: z.string(),
      title: z.string().optional(),
      subtitle: z.string().optional(),
      content: z.string().optional(),
      position: z.object({
        x: z.number(),
        y: z.number()
      }),
      visible: z.boolean()
    });
    InsertTextOverlaySchema = TextOverlaySchema.omit({ id: true });
    ThemeSchema = z.object({
      id: z.string(),
      name: z.string(),
      fontFamily: z.string(),
      fontSize: z.number(),
      fontWeight: z.string(),
      color: z.string(),
      textAlign: z.enum(["left", "center", "right"]),
      textShadow: z.string().optional(),
      backgroundColor: z.string().optional(),
      padding: z.number()
    });
    InsertThemeSchema = ThemeSchema.omit({ id: true });
    PlaylistSchema = z.object({
      id: z.string(),
      name: z.string(),
      items: z.array(z.string()),
      currentIndex: z.number(),
      autoPlay: z.boolean(),
      autoPlayInterval: z.number(),
      loop: z.boolean(),
      pauseAtEnd: z.boolean(),
      createdAt: z.number(),
      updatedAt: z.number()
    });
    InsertPlaylistSchema = PlaylistSchema.omit({ id: true, createdAt: true, updatedAt: true });
    AppSettingsSchema = z.object({
      volume: z.number().min(0).max(100),
      muted: z.boolean(),
      showProjector: z.boolean(),
      currentThemeId: z.string().optional(),
      fitMode: FitModeSchema,
      zoom: z.number(),
      panX: z.number(),
      panY: z.number(),
      slideDuration: z.number(),
      textFontSize: z.number().optional(),
      autoFitText: z.boolean().optional(),
      darkScreen: z.boolean(),
      blackScreen: z.boolean().optional(),
      showLogo: z.boolean().optional(),
      logoUrl: z.string().optional(),
      isLive: z.boolean().optional(),
      waitingMessageTitle: z.string().optional(),
      waitingMessageSubtitle: z.string().optional()
    });
    InsertAppSettingsSchema = AppSettingsSchema.partial();
    ExportDataSchema = z.object({
      playlists: z.array(PlaylistSchema),
      mediaItems: z.array(MediaItemSchema),
      themes: z.array(ThemeSchema),
      exportDate: z.string()
    });
    AnnouncementTypeSchema = z.enum(["image", "video", "text"]);
    AnnouncementSchema = z.object({
      id: z.number(),
      type: AnnouncementTypeSchema,
      title: z.string(),
      content: z.string(),
      imageUrl: z.string().optional(),
      videoUrl: z.string().optional(),
      active: z.boolean(),
      createdAt: z.date(),
      updatedAt: z.date()
    });
    InsertAnnouncementSchema = AnnouncementSchema.omit({ id: true, createdAt: true, updatedAt: true });
    UserSettingsSchema = z.object({
      id: z.number(),
      userId: z.number(),
      churchName: z.string().optional(),
      createdAt: z.date(),
      updatedAt: z.date()
    });
    SupportTicketStatusSchema = z.enum(["pending", "in_progress", "resolved", "closed"]);
    SupportTicketSchema = z.object({
      id: z.number(),
      username: z.string(),
      email: z.string(),
      phone: z.string(),
      subject: z.string(),
      message: z.string(),
      status: SupportTicketStatusSchema,
      adminResponse: z.string().optional(),
      respondedAt: z.date().optional(),
      createdAt: z.date(),
      updatedAt: z.date()
    });
    InsertSupportTicketSchema = z.object({
      username: z.string().min(1, "Nome de usu\xE1rio \xE9 obrigat\xF3rio"),
      email: z.string().email("Email inv\xE1lido"),
      phone: z.string().min(10, "Telefone deve ter pelo menos 10 d\xEDgitos"),
      subject: z.string().min(1, "Assunto \xE9 obrigat\xF3rio"),
      message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres")
    });
    UpdateSupportTicketSchema = z.object({
      status: SupportTicketStatusSchema.optional(),
      adminResponse: z.string().optional()
    });
  }
});

// server/firebase.ts
var firebase_exports = {};
__export(firebase_exports, {
  FieldValue: () => FieldValue,
  getFirebaseDb: () => getFirebaseDb
});
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
function getFirebaseDb() {
  if (db) return db;
  if (getApps().length === 0) {
    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID;
    if (!projectId) {
      throw new Error("FIREBASE_PROJECT_ID must be set");
    }
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
        initializeApp({
          credential: cert(serviceAccount),
          projectId
        });
      } catch (error) {
        throw new Error("Invalid FIREBASE_SERVICE_ACCOUNT_KEY JSON format");
      }
    } else {
      throw new Error(
        "FIREBASE_SERVICE_ACCOUNT_KEY must be set for Firebase Admin SDK. Download it from Firebase Console > Project Settings > Service Accounts > Generate new private key"
      );
    }
  }
  db = getFirestore();
  return db;
}
var db;
var init_firebase = __esm({
  "server/firebase.ts"() {
    "use strict";
    db = null;
  }
});

// server/index.ts
import express2 from "express";
import cors from "cors";

// server/routes.ts
init_schema();
import { createServer } from "http";

// server/storage.ts
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
var DATA_DIR = path.join(process.cwd(), "data");
var USERS_FILE = path.join(DATA_DIR, "users.json");
var LOGIN_ATTEMPTS_FILE = path.join(DATA_DIR, "login_attempts.json");
var ANNOUNCEMENTS_FILE = path.join(DATA_DIR, "announcements.json");
var USER_SETTINGS_FILE = path.join(DATA_DIR, "user_settings.json");
var SUPPORT_TICKETS_FILE = path.join(DATA_DIR, "support_tickets.json");
function getInitialUsers() {
  const users2 = [];
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  if (adminEmail && adminPassword) {
    users2.push({
      email: adminEmail,
      username: adminUsername,
      password: adminPassword,
      role: "admin"
    });
    console.log(`Admin configured: ${adminEmail}`);
  }
  return users2;
}
var FileStorage = class {
  users = [];
  loginAttempts = [];
  nextUserId = 1;
  nextAttemptId = 1;
  ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }
  loadUsers() {
    this.ensureDataDir();
    if (fs.existsSync(USERS_FILE)) {
      try {
        const data = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
        this.users = data.users.map((u) => ({
          ...u,
          createdAt: new Date(u.createdAt),
          updatedAt: new Date(u.updatedAt),
          lastFailedAttempt: u.lastFailedAttempt ? new Date(u.lastFailedAttempt) : null
        }));
        this.nextUserId = data.nextUserId;
      } catch {
        this.users = [];
        this.nextUserId = 1;
      }
    }
  }
  saveUsers() {
    this.ensureDataDir();
    const data = {
      users: this.users,
      nextUserId: this.nextUserId
    };
    fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2), "utf-8");
  }
  loadLoginAttempts() {
    this.ensureDataDir();
    if (fs.existsSync(LOGIN_ATTEMPTS_FILE)) {
      try {
        const data = JSON.parse(fs.readFileSync(LOGIN_ATTEMPTS_FILE, "utf-8"));
        this.loginAttempts = data.attempts.map((a) => ({
          ...a,
          createdAt: new Date(a.createdAt)
        }));
        this.nextAttemptId = data.nextAttemptId;
      } catch {
        this.loginAttempts = [];
        this.nextAttemptId = 1;
      }
    }
  }
  saveLoginAttempts() {
    this.ensureDataDir();
    const data = {
      attempts: this.loginAttempts,
      nextAttemptId: this.nextAttemptId
    };
    fs.writeFileSync(LOGIN_ATTEMPTS_FILE, JSON.stringify(data, null, 2), "utf-8");
  }
  async init() {
    this.loadUsers();
    this.loadLoginAttempts();
    const initialUsers = getInitialUsers();
    for (const user of initialUsers) {
      const existing = await this.getUserByEmail(user.email);
      if (!existing) {
        await this.addUser(user.email, user.username, "", user.password, user.role, {
          question1: "Pergunta padr\xE3o",
          answer1: "resposta",
          question2: "Pergunta padr\xE3o",
          answer2: "resposta",
          question3: "Pergunta padr\xE3o",
          answer3: "resposta"
        });
      }
    }
  }
  async addUser(email, username, phone, password, role, securityQuestions) {
    const passwordHash = await bcrypt.hash(password, 10);
    const answerHash1 = await bcrypt.hash(securityQuestions.answer1.toLowerCase().trim(), 10);
    const answerHash2 = await bcrypt.hash(securityQuestions.answer2.toLowerCase().trim(), 10);
    const answerHash3 = await bcrypt.hash(securityQuestions.answer3.toLowerCase().trim(), 10);
    const now = /* @__PURE__ */ new Date();
    const user = {
      id: this.nextUserId++,
      email,
      username,
      phone,
      passwordHash,
      role,
      securityQuestion1: securityQuestions.question1,
      securityAnswer1: answerHash1,
      securityQuestion2: securityQuestions.question2,
      securityAnswer2: answerHash2,
      securityQuestion3: securityQuestions.question3,
      securityAnswer3: answerHash3,
      isBlocked: false,
      failedAttempts: 0,
      lastFailedAttempt: null,
      createdAt: now,
      updatedAt: now
    };
    this.users.push(user);
    this.saveUsers();
    return user;
  }
  async verifySecurityAnswers(userId, answer1, answer2, answer3) {
    const user = await this.getUserById(userId);
    if (!user) return false;
    const match1 = await bcrypt.compare(answer1.toLowerCase().trim(), user.securityAnswer1);
    const match2 = await bcrypt.compare(answer2.toLowerCase().trim(), user.securityAnswer2);
    const match3 = await bcrypt.compare(answer3.toLowerCase().trim(), user.securityAnswer3);
    return match1 && match2 && match3;
  }
  async getSecurityQuestions(identifier) {
    const user = await this.getUserByIdentifier(identifier);
    if (!user) return null;
    return {
      question1: user.securityQuestion1,
      question2: user.securityQuestion2,
      question3: user.securityQuestion3
    };
  }
  async updatePassword(userId, newPassword) {
    const passwordHash = await bcrypt.hash(newPassword, 10);
    const result = await this.updateUser(userId, { passwordHash });
    return result !== null;
  }
  async getUserByEmail(email) {
    return this.users.find((u) => u.email === email) || null;
  }
  async getUserByUsername(username) {
    return this.users.find((u) => u.username === username) || null;
  }
  async getUserByPhone(phone) {
    return this.users.find((u) => u.phone === phone) || null;
  }
  async getUserByIdentifier(identifier) {
    return this.users.find((u) => u.email === identifier || u.username === identifier) || null;
  }
  async getUserById(id) {
    return this.users.find((u) => u.id === id) || null;
  }
  async verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }
  async getAllUsers() {
    return [...this.users].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  async updateUser(id, updates) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) return null;
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updates,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.saveUsers();
    return this.users[userIndex];
  }
  async deleteUser(id) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) return false;
    this.users.splice(userIndex, 1);
    this.saveUsers();
    return true;
  }
  async incrementFailedAttempts(id) {
    const user = await this.getUserById(id);
    if (user) {
      await this.updateUser(id, {
        failedAttempts: user.failedAttempts + 1,
        lastFailedAttempt: /* @__PURE__ */ new Date()
      });
    }
  }
  async resetFailedAttempts(id) {
    await this.updateUser(id, {
      failedAttempts: 0,
      lastFailedAttempt: null
    });
  }
  async blockUser(id) {
    await this.updateUser(id, { isBlocked: true });
  }
  async unblockUser(id) {
    await this.updateUser(id, { isBlocked: false, failedAttempts: 0 });
  }
  async logLoginAttempt(attempt) {
    const log2 = {
      id: this.nextAttemptId++,
      ...attempt,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.loginAttempts.push(log2);
    this.saveLoginAttempts();
    return log2;
  }
  async getLoginAttempts(userId, limit = 50) {
    let attempts = [...this.loginAttempts];
    if (userId !== void 0) {
      attempts = attempts.filter((a) => a.userId === userId);
    }
    return attempts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, limit);
  }
  async getRecentFailedAttempts(email, minutes) {
    const cutoff = new Date(Date.now() - minutes * 60 * 1e3);
    return this.loginAttempts.filter(
      (a) => a.email === email && !a.success && a.createdAt >= cutoff
    ).length;
  }
  async getRecentFailedAttemptsByIp(ipAddress, minutes) {
    const cutoff = new Date(Date.now() - minutes * 60 * 1e3);
    return this.loginAttempts.filter(
      (a) => a.ipAddress === ipAddress && !a.success && a.createdAt >= cutoff
    ).length;
  }
  announcements = [];
  nextAnnouncementId = 1;
  userSettings = [];
  nextSettingsId = 1;
  loadAnnouncements() {
    this.ensureDataDir();
    if (fs.existsSync(ANNOUNCEMENTS_FILE)) {
      try {
        const data = JSON.parse(fs.readFileSync(ANNOUNCEMENTS_FILE, "utf-8"));
        this.announcements = data.announcements.map((a) => ({
          ...a,
          createdAt: new Date(a.createdAt),
          updatedAt: new Date(a.updatedAt)
        }));
        this.nextAnnouncementId = data.nextAnnouncementId;
      } catch {
        this.announcements = [];
        this.nextAnnouncementId = 1;
      }
    }
  }
  saveAnnouncements() {
    this.ensureDataDir();
    const data = {
      announcements: this.announcements,
      nextAnnouncementId: this.nextAnnouncementId
    };
    fs.writeFileSync(ANNOUNCEMENTS_FILE, JSON.stringify(data, null, 2), "utf-8");
  }
  loadUserSettings() {
    this.ensureDataDir();
    if (fs.existsSync(USER_SETTINGS_FILE)) {
      try {
        const data = JSON.parse(fs.readFileSync(USER_SETTINGS_FILE, "utf-8"));
        this.userSettings = data.settings.map((s) => ({
          ...s,
          createdAt: new Date(s.createdAt),
          updatedAt: new Date(s.updatedAt)
        }));
        this.nextSettingsId = data.nextSettingsId;
      } catch {
        this.userSettings = [];
        this.nextSettingsId = 1;
      }
    }
  }
  saveUserSettings() {
    this.ensureDataDir();
    const data = {
      settings: this.userSettings,
      nextSettingsId: this.nextSettingsId
    };
    fs.writeFileSync(USER_SETTINGS_FILE, JSON.stringify(data, null, 2), "utf-8");
  }
  async createAnnouncement(data) {
    this.loadAnnouncements();
    const now = /* @__PURE__ */ new Date();
    const announcement = {
      id: this.nextAnnouncementId++,
      ...data,
      createdAt: now,
      updatedAt: now
    };
    this.announcements.push(announcement);
    this.saveAnnouncements();
    return announcement;
  }
  async getAnnouncements() {
    this.loadAnnouncements();
    return [...this.announcements].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  async getActiveAnnouncements() {
    this.loadAnnouncements();
    return this.announcements.filter((a) => a.active).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  async getAnnouncementById(id) {
    this.loadAnnouncements();
    return this.announcements.find((a) => a.id === id) || null;
  }
  async updateAnnouncement(id, data) {
    this.loadAnnouncements();
    const idx = this.announcements.findIndex((a) => a.id === id);
    if (idx === -1) return null;
    this.announcements[idx] = {
      ...this.announcements[idx],
      ...data,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.saveAnnouncements();
    return this.announcements[idx];
  }
  async deleteAnnouncement(id) {
    this.loadAnnouncements();
    const idx = this.announcements.findIndex((a) => a.id === id);
    if (idx === -1) return false;
    this.announcements.splice(idx, 1);
    this.saveAnnouncements();
    return true;
  }
  async getUserSettings(userId) {
    this.loadUserSettings();
    return this.userSettings.find((s) => s.userId === userId) || null;
  }
  async updateUserSettings(userId, data) {
    this.loadUserSettings();
    const existing = await this.getUserSettings(userId);
    if (existing) {
      const idx = this.userSettings.findIndex((s) => s.userId === userId);
      this.userSettings[idx] = {
        ...existing,
        ...data,
        updatedAt: /* @__PURE__ */ new Date()
      };
      this.saveUserSettings();
      return this.userSettings[idx];
    }
    const now = /* @__PURE__ */ new Date();
    const settings = {
      id: this.nextSettingsId++,
      userId,
      churchName: data.churchName,
      createdAt: now,
      updatedAt: now
    };
    this.userSettings.push(settings);
    this.saveUserSettings();
    return settings;
  }
  supportTickets = [];
  nextTicketId = 1;
  loadSupportTickets() {
    this.ensureDataDir();
    if (fs.existsSync(SUPPORT_TICKETS_FILE)) {
      try {
        const data = JSON.parse(fs.readFileSync(SUPPORT_TICKETS_FILE, "utf-8"));
        this.supportTickets = data.tickets.map((t) => ({
          ...t,
          createdAt: new Date(t.createdAt),
          updatedAt: new Date(t.updatedAt),
          respondedAt: t.respondedAt ? new Date(t.respondedAt) : void 0
        }));
        this.nextTicketId = data.nextTicketId;
      } catch {
        this.supportTickets = [];
        this.nextTicketId = 1;
      }
    }
  }
  saveSupportTickets() {
    this.ensureDataDir();
    const data = {
      tickets: this.supportTickets,
      nextTicketId: this.nextTicketId
    };
    fs.writeFileSync(SUPPORT_TICKETS_FILE, JSON.stringify(data, null, 2), "utf-8");
  }
  async createSupportTicket(data) {
    this.loadSupportTickets();
    const now = /* @__PURE__ */ new Date();
    const ticket = {
      id: this.nextTicketId++,
      ...data,
      status: "pending",
      createdAt: now,
      updatedAt: now
    };
    this.supportTickets.push(ticket);
    this.saveSupportTickets();
    return ticket;
  }
  async getSupportTickets() {
    this.loadSupportTickets();
    return [...this.supportTickets].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  async getSupportTicketById(id) {
    this.loadSupportTickets();
    return this.supportTickets.find((t) => t.id === id) || null;
  }
  async updateSupportTicket(id, data) {
    this.loadSupportTickets();
    const idx = this.supportTickets.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    const now = /* @__PURE__ */ new Date();
    this.supportTickets[idx] = {
      ...this.supportTickets[idx],
      ...data,
      respondedAt: data.adminResponse ? now : this.supportTickets[idx].respondedAt,
      updatedAt: now
    };
    this.saveSupportTickets();
    return this.supportTickets[idx];
  }
  async deleteSupportTicket(id) {
    this.loadSupportTickets();
    const idx = this.supportTickets.findIndex((t) => t.id === id);
    if (idx === -1) return false;
    this.supportTickets.splice(idx, 1);
    this.saveSupportTickets();
    return true;
  }
};
var FirebaseStorage = class {
  db = null;
  async getDb() {
    if (!this.db) {
      const { getFirebaseDb: getFirebaseDb2 } = await Promise.resolve().then(() => (init_firebase(), firebase_exports));
      this.db = getFirebaseDb2();
    }
    return this.db;
  }
  async getNextId(counterName) {
    const db2 = await this.getDb();
    const { FieldValue: FieldValue2 } = await Promise.resolve().then(() => (init_firebase(), firebase_exports));
    const counterRef = db2.collection("counters").doc(counterName);
    const result = await db2.runTransaction(async (transaction) => {
      const counterDoc = await transaction.get(counterRef);
      let nextId = 1;
      if (counterDoc.exists) {
        nextId = (counterDoc.data()?.value || 0) + 1;
      }
      transaction.set(counterRef, { value: nextId });
      return nextId;
    });
    return result;
  }
  async init() {
    const initialUsers = getInitialUsers();
    for (const user of initialUsers) {
      const existing = await this.getUserByEmail(user.email);
      if (!existing) {
        await this.addUser(user.email, user.username, "", user.password, user.role, {
          question1: "Pergunta padr\xE3o",
          answer1: "resposta",
          question2: "Pergunta padr\xE3o",
          answer2: "resposta",
          question3: "Pergunta padr\xE3o",
          answer3: "resposta"
        });
      }
    }
  }
  async addUser(email, username, phone, password, role, securityQuestions) {
    const db2 = await this.getDb();
    const passwordHash = await bcrypt.hash(password, 10);
    const answerHash1 = await bcrypt.hash(securityQuestions.answer1.toLowerCase().trim(), 10);
    const answerHash2 = await bcrypt.hash(securityQuestions.answer2.toLowerCase().trim(), 10);
    const answerHash3 = await bcrypt.hash(securityQuestions.answer3.toLowerCase().trim(), 10);
    const now = /* @__PURE__ */ new Date();
    const nextId = await this.getNextId("users");
    const user = {
      id: nextId,
      email,
      username,
      phone,
      passwordHash,
      role,
      securityQuestion1: securityQuestions.question1,
      securityAnswer1: answerHash1,
      securityQuestion2: securityQuestions.question2,
      securityAnswer2: answerHash2,
      securityQuestion3: securityQuestions.question3,
      securityAnswer3: answerHash3,
      isBlocked: false,
      failedAttempts: 0,
      lastFailedAttempt: null,
      createdAt: now,
      updatedAt: now
    };
    await db2.collection("users").doc(String(nextId)).set({
      ...user,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      lastFailedAttempt: null
    });
    return user;
  }
  async verifySecurityAnswers(userId, answer1, answer2, answer3) {
    const user = await this.getUserById(userId);
    if (!user) return false;
    const match1 = await bcrypt.compare(answer1.toLowerCase().trim(), user.securityAnswer1);
    const match2 = await bcrypt.compare(answer2.toLowerCase().trim(), user.securityAnswer2);
    const match3 = await bcrypt.compare(answer3.toLowerCase().trim(), user.securityAnswer3);
    return match1 && match2 && match3;
  }
  async getSecurityQuestions(identifier) {
    const user = await this.getUserByIdentifier(identifier);
    if (!user) return null;
    return {
      question1: user.securityQuestion1,
      question2: user.securityQuestion2,
      question3: user.securityQuestion3
    };
  }
  async updatePassword(userId, newPassword) {
    const passwordHash = await bcrypt.hash(newPassword, 10);
    const result = await this.updateUser(userId, { passwordHash });
    return result !== null;
  }
  docToUser(doc) {
    if (!doc.exists) return null;
    const data = doc.data();
    return {
      id: data.id,
      email: data.email,
      username: data.username,
      phone: data.phone || "",
      passwordHash: data.passwordHash,
      role: data.role,
      securityQuestion1: data.securityQuestion1 || "",
      securityAnswer1: data.securityAnswer1 || "",
      securityQuestion2: data.securityQuestion2 || "",
      securityAnswer2: data.securityAnswer2 || "",
      securityQuestion3: data.securityQuestion3 || "",
      securityAnswer3: data.securityAnswer3 || "",
      isBlocked: data.isBlocked,
      failedAttempts: data.failedAttempts,
      lastFailedAttempt: data.lastFailedAttempt ? new Date(data.lastFailedAttempt) : null,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt)
    };
  }
  async getUserByEmail(email) {
    const db2 = await this.getDb();
    const snapshot = await db2.collection("users").where("email", "==", email).limit(1).get();
    if (snapshot.empty) return null;
    return this.docToUser(snapshot.docs[0]);
  }
  async getUserByUsername(username) {
    const db2 = await this.getDb();
    const snapshot = await db2.collection("users").where("username", "==", username).limit(1).get();
    if (snapshot.empty) return null;
    return this.docToUser(snapshot.docs[0]);
  }
  async getUserByIdentifier(identifier) {
    const byEmail = await this.getUserByEmail(identifier);
    if (byEmail) return byEmail;
    return this.getUserByUsername(identifier);
  }
  async getUserById(id) {
    const db2 = await this.getDb();
    const doc = await db2.collection("users").doc(String(id)).get();
    return this.docToUser(doc);
  }
  async verifyPassword(password, hash) {
    if (!hash || typeof hash !== "string") {
      return false;
    }
    if (hash.startsWith("$2a$") || hash.startsWith("$2b$") || hash.startsWith("$2y$")) {
      return bcrypt.compare(password, hash);
    }
    return password === hash;
  }
  async getAllUsers() {
    const db2 = await this.getDb();
    const snapshot = await db2.collection("users").orderBy("createdAt", "desc").get();
    return snapshot.docs.map((doc) => this.docToUser(doc)).filter(Boolean);
  }
  async updateUser(id, updates) {
    const db2 = await this.getDb();
    const docRef = db2.collection("users").doc(String(id));
    const doc = await docRef.get();
    if (!doc.exists) return null;
    const updateData = { ...updates, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
    if ("lastFailedAttempt" in updates) {
      updateData.lastFailedAttempt = updates.lastFailedAttempt ? updates.lastFailedAttempt.toISOString() : null;
    }
    if (updates.createdAt) {
      updateData.createdAt = updates.createdAt.toISOString();
    }
    await docRef.update(updateData);
    const updatedDoc = await docRef.get();
    return this.docToUser(updatedDoc);
  }
  async deleteUser(id) {
    const db2 = await this.getDb();
    const docRef = db2.collection("users").doc(String(id));
    const doc = await docRef.get();
    if (!doc.exists) return false;
    await docRef.delete();
    return true;
  }
  async incrementFailedAttempts(id) {
    const user = await this.getUserById(id);
    if (user) {
      await this.updateUser(id, {
        failedAttempts: user.failedAttempts + 1,
        lastFailedAttempt: /* @__PURE__ */ new Date()
      });
    }
  }
  async resetFailedAttempts(id) {
    const db2 = await this.getDb();
    await db2.collection("users").doc(String(id)).update({
      failedAttempts: 0,
      lastFailedAttempt: null,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  async blockUser(id) {
    await this.updateUser(id, { isBlocked: true });
  }
  async unblockUser(id) {
    const db2 = await this.getDb();
    await db2.collection("users").doc(String(id)).update({
      isBlocked: false,
      failedAttempts: 0,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  async logLoginAttempt(attempt) {
    const db2 = await this.getDb();
    const now = /* @__PURE__ */ new Date();
    const nextId = await this.getNextId("loginAttempts");
    const log2 = {
      id: nextId,
      ...attempt,
      createdAt: now
    };
    await db2.collection("loginAttempts").doc(String(nextId)).set({
      ...log2,
      createdAt: now.toISOString()
    });
    return log2;
  }
  async getLoginAttempts(userId, limit = 50) {
    const db2 = await this.getDb();
    let snapshot;
    if (userId !== void 0) {
      snapshot = await db2.collection("loginAttempts").where("userId", "==", userId).get();
    } else {
      snapshot = await db2.collection("loginAttempts").get();
    }
    const attempts = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: data.id,
        userId: data.userId,
        email: data.email,
        ipAddress: data.ipAddress,
        success: data.success,
        userAgent: data.userAgent,
        createdAt: new Date(data.createdAt)
      };
    });
    return attempts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, limit);
  }
  async getRecentFailedAttempts(email, minutes) {
    const db2 = await this.getDb();
    const cutoff = new Date(Date.now() - minutes * 60 * 1e3);
    const snapshot = await db2.collection("loginAttempts").where("email", "==", email).get();
    return snapshot.docs.filter((doc) => {
      const data = doc.data();
      return data.success === false && new Date(data.createdAt) >= cutoff;
    }).length;
  }
  async getRecentFailedAttemptsByIp(ipAddress, minutes) {
    const db2 = await this.getDb();
    const cutoff = new Date(Date.now() - minutes * 60 * 1e3);
    const snapshot = await db2.collection("loginAttempts").where("ipAddress", "==", ipAddress).get();
    return snapshot.docs.filter((doc) => {
      const data = doc.data();
      return data.success === false && new Date(data.createdAt) >= cutoff;
    }).length;
  }
  async createAnnouncement(data) {
    const db2 = await this.getDb();
    const now = /* @__PURE__ */ new Date();
    const nextId = await this.getNextId("announcements");
    const announcement = {
      id: nextId,
      ...data,
      createdAt: now,
      updatedAt: now
    };
    await db2.collection("announcements").doc(String(nextId)).set({
      ...announcement,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    });
    return announcement;
  }
  async getAnnouncements() {
    const db2 = await this.getDb();
    const snapshot = await db2.collection("announcements").get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: data.id,
        type: data.type,
        title: data.title,
        content: data.content,
        imageUrl: data.imageUrl,
        videoUrl: data.videoUrl,
        active: data.active,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt)
      };
    }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  async getActiveAnnouncements() {
    const db2 = await this.getDb();
    const snapshot = await db2.collection("announcements").where("active", "==", true).get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: data.id,
        type: data.type,
        title: data.title,
        content: data.content,
        imageUrl: data.imageUrl,
        videoUrl: data.videoUrl,
        active: data.active,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt)
      };
    }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  async getAnnouncementById(id) {
    const db2 = await this.getDb();
    const doc = await db2.collection("announcements").doc(String(id)).get();
    if (!doc.exists) return null;
    const data = doc.data();
    return {
      id: data.id,
      type: data.type,
      title: data.title,
      content: data.content,
      imageUrl: data.imageUrl,
      videoUrl: data.videoUrl,
      active: data.active,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt)
    };
  }
  async updateAnnouncement(id, data) {
    const db2 = await this.getDb();
    const existing = await this.getAnnouncementById(id);
    if (!existing) return null;
    const updated = {
      ...existing,
      ...data,
      updatedAt: /* @__PURE__ */ new Date()
    };
    await db2.collection("announcements").doc(String(id)).update({
      ...data,
      updatedAt: updated.updatedAt.toISOString()
    });
    return updated;
  }
  async deleteAnnouncement(id) {
    const db2 = await this.getDb();
    const existing = await this.getAnnouncementById(id);
    if (!existing) return false;
    await db2.collection("announcements").doc(String(id)).delete();
    return true;
  }
  async getUserSettings(userId) {
    const db2 = await this.getDb();
    const snapshot = await db2.collection("userSettings").where("userId", "==", userId).limit(1).get();
    if (snapshot.empty) return null;
    const data = snapshot.docs[0].data();
    return {
      id: data.id,
      userId: data.userId,
      churchName: data.churchName,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt)
    };
  }
  async updateUserSettings(userId, data) {
    const db2 = await this.getDb();
    const existing = await this.getUserSettings(userId);
    const now = /* @__PURE__ */ new Date();
    if (existing) {
      const updated = {
        ...existing,
        ...data,
        updatedAt: now
      };
      await db2.collection("userSettings").doc(String(existing.id)).update({
        ...data,
        updatedAt: now.toISOString()
      });
      return updated;
    }
    const nextId = await this.getNextId("userSettings");
    const settings = {
      id: nextId,
      userId,
      churchName: data.churchName,
      createdAt: now,
      updatedAt: now
    };
    await db2.collection("userSettings").doc(String(nextId)).set({
      ...settings,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    });
    return settings;
  }
  async createSupportTicket(data) {
    const db2 = await this.getDb();
    const now = /* @__PURE__ */ new Date();
    const nextId = await this.getNextId("supportTickets");
    const ticket = {
      id: nextId,
      ...data,
      status: "pending",
      createdAt: now,
      updatedAt: now
    };
    await db2.collection("supportTickets").doc(String(nextId)).set({
      ...ticket,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    });
    return ticket;
  }
  async getSupportTickets() {
    const db2 = await this.getDb();
    const snapshot = await db2.collection("supportTickets").get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: data.id,
        username: data.username,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        status: data.status,
        adminResponse: data.adminResponse,
        respondedAt: data.respondedAt ? new Date(data.respondedAt) : void 0,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt)
      };
    }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  async getSupportTicketById(id) {
    const db2 = await this.getDb();
    const doc = await db2.collection("supportTickets").doc(String(id)).get();
    if (!doc.exists) return null;
    const data = doc.data();
    return {
      id: data.id,
      username: data.username,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      status: data.status,
      adminResponse: data.adminResponse,
      respondedAt: data.respondedAt ? new Date(data.respondedAt) : void 0,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt)
    };
  }
  async updateSupportTicket(id, data) {
    const db2 = await this.getDb();
    const existing = await this.getSupportTicketById(id);
    if (!existing) return null;
    const now = /* @__PURE__ */ new Date();
    const updated = {
      ...existing,
      ...data,
      respondedAt: data.adminResponse ? now : existing.respondedAt,
      updatedAt: now
    };
    const updateData = {
      ...data,
      updatedAt: now.toISOString()
    };
    if (data.adminResponse) {
      updateData.respondedAt = now.toISOString();
    }
    await db2.collection("supportTickets").doc(String(id)).update(updateData);
    return updated;
  }
  async deleteSupportTicket(id) {
    const db2 = await this.getDb();
    const existing = await this.getSupportTicketById(id);
    if (!existing) return false;
    await db2.collection("supportTickets").doc(String(id)).delete();
    return true;
  }
};
function getStorageImplementation() {
  if (process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID) {
    console.log("Using Firebase storage");
    return new FirebaseStorage();
  }
  console.log("Using file-based storage");
  return new FileStorage();
}
var storage = getStorageImplementation();

// server/auth.ts
import jwt from "jsonwebtoken";
var JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-change-in-production";
var REFRESH_SECRET = process.env.REFRESH_SECRET || "refresh-secret-key-change-in-production";
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
}
function generateRefreshToken(user) {
  return jwt.sign(
    {
      id: user.id,
      type: "refresh"
    },
    REFRESH_SECRET,
    { expiresIn: "7d" }
  );
}
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
function verifyRefreshToken(token) {
  try {
    const payload = jwt.verify(token, REFRESH_SECRET);
    if (payload.type !== "refresh") return null;
    return payload;
  } catch (error) {
    return null;
  }
}
function extractToken(authHeader) {
  if (!authHeader) return null;
  const parts = authHeader.split(" ");
  if (parts.length === 2 && parts[0] === "Bearer") {
    return parts[1];
  }
  return null;
}

// server/routes.ts
var MAX_FAILED_ATTEMPTS = 5;
var LOCKOUT_MINUTES = 15;
var RATE_LIMIT_WINDOW = 15;
var MAX_ATTEMPTS_PER_WINDOW = 10;
var MAX_ATTEMPTS_PER_IP = 20;
async function registerRoutes(app2) {
  await storage.init();
  app2.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  });
  const requireAuth = (req, res, next) => {
    const token = extractToken(req.headers.authorization);
    if (!token) {
      return res.status(401).json({ message: "Token n\xE3o fornecido" });
    }
    const payload = verifyToken(token);
    if (!payload) {
      return res.status(401).json({ message: "Token inv\xE1lido ou expirado" });
    }
    req.user = payload;
    next();
  };
  const requireAdmin = (req, res, next) => {
    requireAuth(req, res, () => {
      if (req.user?.role !== "admin") {
        return res.status(403).json({ message: "Acesso negado - permiss\xE3o de administrador necess\xE1ria" });
      }
      next();
    });
  };
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const result = LoginRequestSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          message: result.error.errors[0].message
        });
      }
      const { identifier, password } = result.data;
      const ipAddress = req.ip || req.socket.remoteAddress || "unknown";
      const userAgent = req.headers["user-agent"] || "unknown";
      const recentAttempts = await storage.getRecentFailedAttempts(identifier, RATE_LIMIT_WINDOW);
      if (recentAttempts >= MAX_ATTEMPTS_PER_WINDOW) {
        return res.status(429).json({
          message: `Muitas tentativas de login. Aguarde ${RATE_LIMIT_WINDOW} minutos.`,
          code: "RATE_LIMITED"
        });
      }
      const ipAttempts = await storage.getRecentFailedAttemptsByIp(ipAddress, RATE_LIMIT_WINDOW);
      if (ipAttempts >= MAX_ATTEMPTS_PER_IP) {
        return res.status(429).json({
          message: `Muitas tentativas deste endere\xE7o IP. Aguarde ${RATE_LIMIT_WINDOW} minutos.`,
          code: "IP_RATE_LIMITED"
        });
      }
      const user = await storage.getUserByIdentifier(identifier);
      if (!user) {
        await storage.logLoginAttempt({
          userId: null,
          email: identifier,
          ipAddress,
          success: false,
          userAgent
        });
        return res.status(401).json({ message: "Credenciais inv\xE1lidas" });
      }
      if (user.isBlocked) {
        await storage.logLoginAttempt({
          userId: user.id,
          email: identifier,
          ipAddress,
          success: false,
          userAgent
        });
        return res.status(403).json({
          message: "Conta bloqueada. Entre em contato com o administrador.",
          code: "ACCOUNT_BLOCKED"
        });
      }
      if (user.failedAttempts >= MAX_FAILED_ATTEMPTS) {
        const lockoutEnd = user.lastFailedAttempt ? new Date(user.lastFailedAttempt.getTime() + LOCKOUT_MINUTES * 60 * 1e3) : /* @__PURE__ */ new Date();
        if (/* @__PURE__ */ new Date() < lockoutEnd) {
          const remainingMinutes = Math.ceil((lockoutEnd.getTime() - Date.now()) / 6e4);
          return res.status(403).json({
            message: `Conta temporariamente bloqueada. Tente novamente em ${remainingMinutes} minutos.`,
            code: "TEMP_LOCKED"
          });
        } else {
          await storage.resetFailedAttempts(user.id);
        }
      }
      const isPasswordValid = await storage.verifyPassword(password, user.passwordHash);
      if (!isPasswordValid) {
        await storage.incrementFailedAttempts(user.id);
        await storage.logLoginAttempt({
          userId: user.id,
          email: identifier,
          ipAddress,
          success: false,
          userAgent
        });
        const attemptsLeft = MAX_FAILED_ATTEMPTS - (user.failedAttempts + 1);
        if (attemptsLeft > 0) {
          return res.status(401).json({
            message: `Credenciais inv\xE1lidas. ${attemptsLeft} tentativas restantes.`
          });
        } else {
          return res.status(401).json({
            message: "Credenciais inv\xE1lidas. Conta temporariamente bloqueada.",
            code: "TEMP_LOCKED"
          });
        }
      }
      await storage.resetFailedAttempts(user.id);
      await storage.logLoginAttempt({
        userId: user.id,
        email: identifier,
        ipAddress,
        success: true,
        userAgent
      });
      const token = generateToken(user);
      const refreshToken = generateRefreshToken(user);
      res.json({
        token,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Erro ao fazer login" });
    }
  });
  app2.post("/api/auth/register", async (req, res) => {
    try {
      const result = RegisterRequestSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          message: result.error.errors[0].message
        });
      }
      const existingEmail = await storage.getUserByEmail(result.data.email);
      if (existingEmail) {
        return res.status(409).json({ message: "Este email j\xE1 est\xE1 cadastrado" });
      }
      const existingUsername = await storage.getUserByUsername(result.data.username);
      if (existingUsername) {
        return res.status(409).json({ message: "Este nome de usu\xE1rio j\xE1 est\xE1 em uso" });
      }
      const existingPhone = await storage.getUserByPhone(result.data.phone);
      if (existingPhone) {
        return res.status(409).json({ message: "Este n\xFAmero de telefone j\xE1 est\xE1 cadastrado" });
      }
      const user = await storage.addUser(
        result.data.email,
        result.data.username,
        result.data.phone,
        result.data.password,
        "user",
        {
          question1: result.data.securityQuestion1,
          answer1: result.data.securityAnswer1,
          question2: result.data.securityQuestion2,
          answer2: result.data.securityAnswer2,
          question3: result.data.securityQuestion3,
          answer3: result.data.securityAnswer3
        }
      );
      const token = generateToken(user);
      const refreshToken = generateRefreshToken(user);
      res.status(201).json({
        token,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      });
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({ message: "Erro ao registrar" });
    }
  });
  app2.post("/api/auth/security-questions", async (req, res) => {
    try {
      const { identifier } = req.body;
      if (!identifier) {
        return res.status(400).json({ message: "Identificador \xE9 obrigat\xF3rio" });
      }
      const questions = await storage.getSecurityQuestions(identifier);
      if (!questions) {
        return res.status(404).json({ message: "Usu\xE1rio n\xE3o encontrado" });
      }
      res.json({ questions });
    } catch (error) {
      console.error("Security questions error:", error);
      res.status(500).json({ message: "Erro ao buscar perguntas de seguran\xE7a" });
    }
  });
  app2.post("/api/auth/verify-security-answers", async (req, res) => {
    try {
      const { identifier, answer1, answer2, answer3 } = req.body;
      if (!identifier || !answer1 || !answer2 || !answer3) {
        return res.status(400).json({ message: "Todos os campos s\xE3o obrigat\xF3rios" });
      }
      const user = await storage.getUserByIdentifier(identifier);
      if (!user) {
        return res.status(404).json({ message: "Usu\xE1rio n\xE3o encontrado" });
      }
      const isValid = await storage.verifySecurityAnswers(user.id, answer1, answer2, answer3);
      if (!isValid) {
        return res.status(401).json({ message: "Respostas incorretas" });
      }
      res.json({ valid: true });
    } catch (error) {
      console.error("Verify security answers error:", error);
      res.status(500).json({ message: "Erro ao verificar respostas" });
    }
  });
  app2.post("/api/auth/reset-password", async (req, res) => {
    try {
      const { identifier, answer1, answer2, answer3, newPassword, confirmNewPassword } = req.body;
      if (!identifier || !answer1 || !answer2 || !answer3 || !newPassword || !confirmNewPassword) {
        return res.status(400).json({ message: "Todos os campos s\xE3o obrigat\xF3rios" });
      }
      if (newPassword.length < 6) {
        return res.status(400).json({ message: "A nova senha deve ter pelo menos 6 caracteres" });
      }
      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ message: "As senhas n\xE3o coincidem" });
      }
      const user = await storage.getUserByIdentifier(identifier);
      if (!user) {
        return res.status(404).json({ message: "Usu\xE1rio n\xE3o encontrado" });
      }
      const isValid = await storage.verifySecurityAnswers(user.id, answer1, answer2, answer3);
      if (!isValid) {
        return res.status(401).json({ message: "Respostas incorretas" });
      }
      const success = await storage.updatePassword(user.id, newPassword);
      if (!success) {
        return res.status(500).json({ message: "Erro ao atualizar senha" });
      }
      res.json({ message: "Senha alterada com sucesso" });
    } catch (error) {
      console.error("Reset password error:", error);
      res.status(500).json({ message: "Erro ao redefinir senha" });
    }
  });
  app2.post("/api/auth/refresh", async (req, res) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token n\xE3o fornecido" });
      }
      const payload = verifyRefreshToken(refreshToken);
      if (!payload) {
        return res.status(401).json({ message: "Refresh token inv\xE1lido ou expirado" });
      }
      const user = await storage.getUserById(payload.id);
      if (!user) {
        return res.status(401).json({ message: "Usu\xE1rio n\xE3o encontrado" });
      }
      if (user.isBlocked) {
        return res.status(403).json({ message: "Conta bloqueada" });
      }
      const newToken = generateToken(user);
      const newRefreshToken = generateRefreshToken(user);
      res.json({
        token: newToken,
        refreshToken: newRefreshToken
      });
    } catch (error) {
      console.error("Refresh token error:", error);
      res.status(500).json({ message: "Erro ao renovar token" });
    }
  });
  app2.post("/api/auth/logout", requireAuth, (req, res) => {
    res.json({ message: "Desconectado com sucesso" });
  });
  app2.get("/api/auth/verify", requireAuth, (req, res) => {
    res.json({
      valid: true,
      user: {
        id: req.user?.id,
        email: req.user?.email,
        username: req.user?.username,
        role: req.user?.role
      }
    });
  });
  app2.get("/api/admin/users", requireAdmin, async (req, res) => {
    try {
      const users2 = await storage.getAllUsers();
      res.json(
        users2.map((u) => ({
          id: u.id,
          email: u.email,
          username: u.username,
          role: u.role,
          isBlocked: u.isBlocked,
          failedAttempts: u.failedAttempts,
          createdAt: u.createdAt,
          updatedAt: u.updatedAt
        }))
      );
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({ message: "Erro ao buscar usu\xE1rios" });
    }
  });
  app2.get("/api/admin/login-attempts", requireAdmin, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const attempts = await storage.getLoginAttempts(void 0, limit);
      res.json(attempts);
    } catch (error) {
      console.error("Get login attempts error:", error);
      res.status(500).json({ message: "Erro ao buscar logs de acesso" });
    }
  });
  app2.post("/api/admin/users/:id/block", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.blockUser(id);
      res.json({ message: "Usu\xE1rio bloqueado com sucesso" });
    } catch (error) {
      console.error("Block user error:", error);
      res.status(500).json({ message: "Erro ao bloquear usu\xE1rio" });
    }
  });
  app2.post("/api/admin/users/:id/unblock", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.unblockUser(id);
      res.json({ message: "Usu\xE1rio desbloqueado com sucesso" });
    } catch (error) {
      console.error("Unblock user error:", error);
      res.status(500).json({ message: "Erro ao desbloquear usu\xE1rio" });
    }
  });
  app2.delete("/api/admin/users/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteUser(id);
      if (deleted) {
        res.json({ message: "Usu\xE1rio exclu\xEDdo com sucesso" });
      } else {
        res.status(404).json({ message: "Usu\xE1rio n\xE3o encontrado" });
      }
    } catch (error) {
      console.error("Delete user error:", error);
      res.status(500).json({ message: "Erro ao excluir usu\xE1rio" });
    }
  });
  app2.get("/api/user/profile", requireAuth, async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "N\xE3o autenticado" });
      }
      const user = await storage.getUserById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "Usu\xE1rio n\xE3o encontrado" });
      }
      res.json({
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      });
    } catch (error) {
      console.error("Get profile error:", error);
      res.status(500).json({ message: "Erro ao buscar perfil" });
    }
  });
  app2.post("/api/admin/announcements", requireAdmin, async (req, res) => {
    try {
      const { type, title, content, imageUrl, videoUrl, active } = req.body;
      if (!type || !title || !content) {
        return res.status(400).json({ message: "Tipo, t\xEDtulo e conte\xFAdo s\xE3o obrigat\xF3rios" });
      }
      const announcement = await storage.createAnnouncement({
        type,
        title,
        content,
        imageUrl,
        videoUrl,
        active: active ?? true
      });
      res.status(201).json(announcement);
    } catch (error) {
      console.error("Create announcement error:", error);
      res.status(500).json({ message: "Erro ao criar an\xFAncio" });
    }
  });
  app2.get("/api/admin/announcements", requireAdmin, async (req, res) => {
    try {
      const announcements = await storage.getAnnouncements();
      res.json(announcements);
    } catch (error) {
      console.error("Get announcements error:", error);
      res.status(500).json({ message: "Erro ao buscar an\xFAncios" });
    }
  });
  app2.get("/api/announcements", requireAuth, async (req, res) => {
    try {
      const announcements = await storage.getActiveAnnouncements();
      res.json(announcements);
    } catch (error) {
      console.error("Get active announcements error:", error);
      res.status(500).json({ message: "Erro ao buscar an\xFAncios" });
    }
  });
  app2.put("/api/admin/announcements/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { type, title, content, imageUrl, videoUrl, active } = req.body;
      const announcement = await storage.updateAnnouncement(id, {
        type,
        title,
        content,
        imageUrl,
        videoUrl,
        active
      });
      if (!announcement) {
        return res.status(404).json({ message: "An\xFAncio n\xE3o encontrado" });
      }
      res.json(announcement);
    } catch (error) {
      console.error("Update announcement error:", error);
      res.status(500).json({ message: "Erro ao atualizar an\xFAncio" });
    }
  });
  app2.delete("/api/admin/announcements/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteAnnouncement(id);
      if (!deleted) {
        return res.status(404).json({ message: "An\xFAncio n\xE3o encontrado" });
      }
      res.json({ message: "An\xFAncio exclu\xEDdo com sucesso" });
    } catch (error) {
      console.error("Delete announcement error:", error);
      res.status(500).json({ message: "Erro ao excluir an\xFAncio" });
    }
  });
  app2.get("/api/user/settings", requireAuth, async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "N\xE3o autenticado" });
      }
      const settings = await storage.getUserSettings(req.user.id);
      res.json(settings || { churchName: "" });
    } catch (error) {
      console.error("Get user settings error:", error);
      res.status(500).json({ message: "Erro ao buscar configura\xE7\xF5es" });
    }
  });
  app2.put("/api/user/settings", requireAuth, async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "N\xE3o autenticado" });
      }
      const { churchName } = req.body;
      const settings = await storage.updateUserSettings(req.user.id, { churchName });
      res.json(settings);
    } catch (error) {
      console.error("Update user settings error:", error);
      res.status(500).json({ message: "Erro ao atualizar configura\xE7\xF5es" });
    }
  });
  app2.post("/api/support", async (req, res) => {
    try {
      const { username, email, phone, subject, message } = req.body;
      if (!username || !email || !subject || !message) {
        return res.status(400).json({ message: "Campos obrigat\xF3rios: nome, email, assunto e mensagem" });
      }
      const ticket = await storage.createSupportTicket({
        username,
        email,
        phone: phone || "",
        subject,
        message
      });
      res.status(201).json({ message: "Mensagem enviada com sucesso", ticket });
    } catch (error) {
      console.error("Create support ticket error:", error);
      res.status(500).json({ message: "Erro ao enviar mensagem de suporte" });
    }
  });
  app2.get("/api/admin/support", requireAdmin, async (req, res) => {
    try {
      const tickets = await storage.getSupportTickets();
      res.json(tickets);
    } catch (error) {
      console.error("Get support tickets error:", error);
      res.status(500).json({ message: "Erro ao buscar tickets de suporte" });
    }
  });
  app2.get("/api/admin/support/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const ticket = await storage.getSupportTicketById(id);
      if (!ticket) {
        return res.status(404).json({ message: "Ticket n\xE3o encontrado" });
      }
      res.json(ticket);
    } catch (error) {
      console.error("Get support ticket error:", error);
      res.status(500).json({ message: "Erro ao buscar ticket de suporte" });
    }
  });
  app2.put("/api/admin/support/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status, adminResponse } = req.body;
      const ticket = await storage.updateSupportTicket(id, {
        status,
        adminResponse
      });
      if (!ticket) {
        return res.status(404).json({ message: "Ticket n\xE3o encontrado" });
      }
      res.json(ticket);
    } catch (error) {
      console.error("Update support ticket error:", error);
      res.status(500).json({ message: "Erro ao atualizar ticket de suporte" });
    }
  });
  app2.delete("/api/admin/support/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteSupportTicket(id);
      if (!deleted) {
        return res.status(404).json({ message: "Ticket n\xE3o encontrado" });
      }
      res.json({ message: "Ticket exclu\xEDdo com sucesso" });
    } catch (error) {
      console.error("Delete support ticket error:", error);
      res.status(500).json({ message: "Erro ao excluir ticket de suporte" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs2 from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import { fileURLToPath } from "url";
var __dirname = path2.dirname(fileURLToPath(import.meta.url));
var vite_config_default = defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path2.resolve(__dirname, "client/src"),
      "@assets": path2.resolve(__dirname, "attached_assets")
    }
  },
  root: path2.resolve(__dirname, "client"),
  build: {
    outDir: path2.resolve(__dirname, "dist"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
var isDevelopment = process.env.NODE_ENV !== "production";
var allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim()) : [];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (isDevelopment) return callback(null, true);
    if (allowedOrigins.some((allowed) => origin === allowed || allowed === "*")) {
      return callback(null, true);
    }
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express2.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
