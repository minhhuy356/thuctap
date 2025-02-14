USE [MS]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 29/11/2024 13:05:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 29/11/2024 13:05:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoleClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 29/11/2024 13:05:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[NormalizedName] [nvarchar](256) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 29/11/2024 13:05:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 29/11/2024 13:05:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](450) NOT NULL,
	[ProviderKey] [nvarchar](450) NOT NULL,
	[ProviderDisplayName] [nvarchar](max) NULL,
	[UserId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 29/11/2024 13:05:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [nvarchar](450) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 29/11/2024 13:05:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](max) NULL,
	[BirthDate] [datetime2](7) NULL,
	[Male] [bit] NOT NULL,
	[UrlImage] [nvarchar](max) NULL,
	[ClassId] [int] NULL,
	[DepartmentId] [int] NULL,
	[MajorId] [int] NULL,
	[IsInternal] [bit] NOT NULL,
	[RefreshToken] [nvarchar](max) NOT NULL,
	[RefreshTokenExpirytime] [datetime2](7) NOT NULL,
	[UserName] [nvarchar](256) NULL,
	[NormalizedUserName] [nvarchar](256) NULL,
	[Email] [nvarchar](256) NULL,
	[NormalizedEmail] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEnd] [datetimeoffset](7) NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
 CONSTRAINT [PK_AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 29/11/2024 13:05:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserTokens](
	[UserId] [nvarchar](450) NOT NULL,
	[LoginProvider] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](450) NOT NULL,
	[Value] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[LoginProvider] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Classes]    Script Date: 29/11/2024 13:05:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Classes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL,
	[CourseId] [int] NOT NULL,
	[DepartmentId] [int] NULL,
 CONSTRAINT [PK_Classes] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Courses]    Script Date: 29/11/2024 13:05:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Courses](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL,
	[StartYear] [int] NOT NULL,
	[EndYear] [int] NOT NULL,
 CONSTRAINT [PK_Courses] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Departments]    Script Date: 29/11/2024 13:05:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Departments](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Departments] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Grade]    Script Date: 29/11/2024 13:05:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Grade](
	[AppUserId] [nvarchar](450) NOT NULL,
	[SectionId] [int] NOT NULL,
	[Name] [nvarchar](max) NULL,
	[Score] [real] NULL,
	[isDone] [bit] NOT NULL,
 CONSTRAINT [PK_Grade] PRIMARY KEY CLUSTERED 
(
	[AppUserId] ASC,
	[SectionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Majors]    Script Date: 29/11/2024 13:05:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Majors](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[DepartmentId] [int] NOT NULL,
	[isSet] [bit] NOT NULL,
 CONSTRAINT [PK_Majors] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Schedules]    Script Date: 29/11/2024 13:05:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Schedules](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DayOfWeek] [int] NOT NULL,
	[TimeStart] [time](7) NOT NULL,
	[TimeEnd] [time](7) NOT NULL,
	[SectionId] [int] NOT NULL,
 CONSTRAINT [PK_Schedules] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sections]    Script Date: 29/11/2024 13:05:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sections](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[SemesterId] [int] NOT NULL,
	[SubjectId] [int] NOT NULL,
	[Character] [nvarchar](max) NOT NULL,
	[StartDate] [datetimeoffset](7) NOT NULL,
	[EndDate] [datetimeoffset](7) NOT NULL,
 CONSTRAINT [PK_Sections] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Semesters]    Script Date: 29/11/2024 13:05:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Semesters](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[AcademicYear] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Semesters] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Subjects]    Script Date: 29/11/2024 13:05:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Subjects](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL,
	[Code] [nvarchar](max) NOT NULL,
	[CreditHours] [int] NOT NULL,
	[DepartmentId] [int] NULL,
 CONSTRAINT [PK_Subjects] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241121072757_create', N'8.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241121072906_addTeacherRole', N'8.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241126020235_ChangeDate', N'8.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241126055631_ChangeTime', N'8.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241126060013_ChangeDate2', N'8.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241126094949_26112024', N'8.0.0')
GO
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'2f547d24-00d6-4e08-9b7c-6ff965ab973d', N'Admin', N'ADMIN', NULL)
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'b6da7a30-4310-4873-9a30-4dc462dcd9b5', N'User', N'USER', NULL)
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'd17296fc-0411-41cc-8e42-e51788763bde', N'Teacher', N'TEACHER', NULL)
GO
INSERT [dbo].[AspNetUserLogins] ([LoginProvider], [ProviderKey], [ProviderDisplayName], [UserId]) VALUES (N'google', N'111878058878498968528', NULL, N'16361675-cc25-482b-9ebd-5def63b4204b')
INSERT [dbo].[AspNetUserLogins] ([LoginProvider], [ProviderKey], [ProviderDisplayName], [UserId]) VALUES (N'google', N'117604207238417942550', NULL, N'a785d282-548c-4810-bf9a-1053585bfc69')
GO
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'16361675-cc25-482b-9ebd-5def63b4204b', N'b6da7a30-4310-4873-9a30-4dc462dcd9b5')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'a785d282-548c-4810-bf9a-1053585bfc69', N'b6da7a30-4310-4873-9a30-4dc462dcd9b5')
GO
INSERT [dbo].[AspNetUsers] ([Id], [Name], [BirthDate], [Male], [UrlImage], [ClassId], [DepartmentId], [MajorId], [IsInternal], [RefreshToken], [RefreshTokenExpirytime], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'16361675-cc25-482b-9ebd-5def63b4204b', NULL, NULL, 0, NULL, NULL, NULL, NULL, 0, N'tXpLbDvcLDst/RmH08o4NshV3+d4YTrtuwaDDSz7f80=', CAST(N'2024-12-28T01:42:36.8955743' AS DateTime2), N'huymail10082002@gmail.com', N'HUYMAIL10082002@GMAIL.COM', N'huymail10082002@gmail.com', N'HUYMAIL10082002@GMAIL.COM', 1, NULL, N'MHTYZHM2SZ57FNVWF4KWAOX2ZBZ74CGO', N'598dfac2-33d5-4be3-a162-b6645d4ab9ff', NULL, 0, 0, NULL, 1, 0)
INSERT [dbo].[AspNetUsers] ([Id], [Name], [BirthDate], [Male], [UrlImage], [ClassId], [DepartmentId], [MajorId], [IsInternal], [RefreshToken], [RefreshTokenExpirytime], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'a785d282-548c-4810-bf9a-1053585bfc69', NULL, NULL, 0, NULL, NULL, NULL, NULL, 0, N'+IgYztVpPS1Y0ByOKLbH0mZGI+tTtE3+p7zoKdBpXSQ=', CAST(N'2024-12-28T01:58:31.2117247' AS DateTime2), N'huyminh356@gmail.com', N'HUYMINH356@GMAIL.COM', N'huyminh356@gmail.com', N'HUYMINH356@GMAIL.COM', 1, NULL, N'PWHRMI47E5RGFGHGHB4WSEAIMK5VJLBC', N'e70c5d05-e077-4be3-988b-2387974e1fa7', NULL, 0, 0, NULL, 1, 0)
GO
SET IDENTITY_INSERT [dbo].[Classes] ON 

INSERT [dbo].[Classes] ([Id], [Name], [CourseId], [DepartmentId]) VALUES (1, N'TPM1', 1, 1)
INSERT [dbo].[Classes] ([Id], [Name], [CourseId], [DepartmentId]) VALUES (2, N'TPM2', 1, 1)
INSERT [dbo].[Classes] ([Id], [Name], [CourseId], [DepartmentId]) VALUES (3, N'TPM3', 1, 1)
INSERT [dbo].[Classes] ([Id], [Name], [CourseId], [DepartmentId]) VALUES (4, N'TPM1', 2, 1)
INSERT [dbo].[Classes] ([Id], [Name], [CourseId], [DepartmentId]) VALUES (5, N'TPM2', 2, 1)
INSERT [dbo].[Classes] ([Id], [Name], [CourseId], [DepartmentId]) VALUES (6, N'TPM1', 3, 1)
INSERT [dbo].[Classes] ([Id], [Name], [CourseId], [DepartmentId]) VALUES (7, N'NN1', 1, 3)
INSERT [dbo].[Classes] ([Id], [Name], [CourseId], [DepartmentId]) VALUES (8, N'NN2', 1, 3)
INSERT [dbo].[Classes] ([Id], [Name], [CourseId], [DepartmentId]) VALUES (9, N'NN1', 2, 3)
INSERT [dbo].[Classes] ([Id], [Name], [CourseId], [DepartmentId]) VALUES (10, N'NN2', 2, 3)
INSERT [dbo].[Classes] ([Id], [Name], [CourseId], [DepartmentId]) VALUES (11, N'NN3', 2, 3)
INSERT [dbo].[Classes] ([Id], [Name], [CourseId], [DepartmentId]) VALUES (12, N'NN1', 3, 3)
INSERT [dbo].[Classes] ([Id], [Name], [CourseId], [DepartmentId]) VALUES (13, N'DL1', 1, 2)
INSERT [dbo].[Classes] ([Id], [Name], [CourseId], [DepartmentId]) VALUES (14, N'DL2', 1, 2)
INSERT [dbo].[Classes] ([Id], [Name], [CourseId], [DepartmentId]) VALUES (15, N'DL1', 2, 2)
INSERT [dbo].[Classes] ([Id], [Name], [CourseId], [DepartmentId]) VALUES (16, N'DL1', 3, 2)
INSERT [dbo].[Classes] ([Id], [Name], [CourseId], [DepartmentId]) VALUES (17, N'DL2', 3, 2)
INSERT [dbo].[Classes] ([Id], [Name], [CourseId], [DepartmentId]) VALUES (18, N'DL3', 3, 2)
SET IDENTITY_INSERT [dbo].[Classes] OFF
GO
SET IDENTITY_INSERT [dbo].[Courses] ON 

INSERT [dbo].[Courses] ([Id], [Name], [StartYear], [EndYear]) VALUES (1, N'K1', 2024, 2028)
INSERT [dbo].[Courses] ([Id], [Name], [StartYear], [EndYear]) VALUES (2, N'K2', 2025, 2029)
INSERT [dbo].[Courses] ([Id], [Name], [StartYear], [EndYear]) VALUES (3, N'K3', 2026, 2030)
INSERT [dbo].[Courses] ([Id], [Name], [StartYear], [EndYear]) VALUES (4, N'K4', 2027, 2031)
INSERT [dbo].[Courses] ([Id], [Name], [StartYear], [EndYear]) VALUES (5, N'K5', 2028, 2032)
SET IDENTITY_INSERT [dbo].[Courses] OFF
GO
SET IDENTITY_INSERT [dbo].[Departments] ON 

INSERT [dbo].[Departments] ([Id], [Name]) VALUES (1, N'Công nghệ thông tin')
INSERT [dbo].[Departments] ([Id], [Name]) VALUES (2, N'Du lịch')
INSERT [dbo].[Departments] ([Id], [Name]) VALUES (3, N'Ngoại ngữ')
SET IDENTITY_INSERT [dbo].[Departments] OFF
GO
INSERT [dbo].[Grade] ([AppUserId], [SectionId], [Name], [Score], [isDone]) VALUES (N'16361675-cc25-482b-9ebd-5def63b4204b', 9, NULL, NULL, 0)
INSERT [dbo].[Grade] ([AppUserId], [SectionId], [Name], [Score], [isDone]) VALUES (N'a785d282-548c-4810-bf9a-1053585bfc69', 12, NULL, 10, 1)
GO
SET IDENTITY_INSERT [dbo].[Majors] ON 

INSERT [dbo].[Majors] ([Id], [Name], [Description], [DepartmentId], [isSet]) VALUES (2, N'Quản trị Du lịch và Lữ hành', NULL, 2, 1)
INSERT [dbo].[Majors] ([Id], [Name], [Description], [DepartmentId], [isSet]) VALUES (3, N'Quản trị Khách sạn', NULL, 2, 1)
INSERT [dbo].[Majors] ([Id], [Name], [Description], [DepartmentId], [isSet]) VALUES (4, N'Quản trị Nhà hàng và Dịch vụ Ăn uống', NULL, 2, 0)
INSERT [dbo].[Majors] ([Id], [Name], [Description], [DepartmentId], [isSet]) VALUES (5, N'Tổ chức Sự kiện và Hội nghị (MICE)', NULL, 2, 0)
INSERT [dbo].[Majors] ([Id], [Name], [Description], [DepartmentId], [isSet]) VALUES (6, N'Hướng dẫn Du lịch', NULL, 2, 1)
INSERT [dbo].[Majors] ([Id], [Name], [Description], [DepartmentId], [isSet]) VALUES (7, N'Quản trị Khu Du lịch và Resort', NULL, 2, 1)
INSERT [dbo].[Majors] ([Id], [Name], [Description], [DepartmentId], [isSet]) VALUES (8, N'Kỹ thuật Phần mềm', NULL, 1, 1)
INSERT [dbo].[Majors] ([Id], [Name], [Description], [DepartmentId], [isSet]) VALUES (9, N'Hệ thống Thông tin', NULL, 1, 1)
INSERT [dbo].[Majors] ([Id], [Name], [Description], [DepartmentId], [isSet]) VALUES (11, N'Trí tuệ Nhân tạo (AI)', NULL, 1, 1)
INSERT [dbo].[Majors] ([Id], [Name], [Description], [DepartmentId], [isSet]) VALUES (12, N'An toàn Thông tin', NULL, 1, 1)
INSERT [dbo].[Majors] ([Id], [Name], [Description], [DepartmentId], [isSet]) VALUES (13, N'Khoa học Dữ liệu', NULL, 1, 1)
INSERT [dbo].[Majors] ([Id], [Name], [Description], [DepartmentId], [isSet]) VALUES (14, N'Game và Multimedia', NULL, 1, 0)
INSERT [dbo].[Majors] ([Id], [Name], [Description], [DepartmentId], [isSet]) VALUES (15, N'Mạng Máy tính và Truyền thông', NULL, 1, 0)
INSERT [dbo].[Majors] ([Id], [Name], [Description], [DepartmentId], [isSet]) VALUES (16, N'Ngôn ngữ Anh', NULL, 3, 1)
INSERT [dbo].[Majors] ([Id], [Name], [Description], [DepartmentId], [isSet]) VALUES (17, N'Ngôn ngữ Trung Quốc', NULL, 3, 1)
INSERT [dbo].[Majors] ([Id], [Name], [Description], [DepartmentId], [isSet]) VALUES (18, N'Ngôn ngữ Nhật', NULL, 3, 1)
INSERT [dbo].[Majors] ([Id], [Name], [Description], [DepartmentId], [isSet]) VALUES (19, N'Ngôn ngữ Hàn Quốc', NULL, 3, 1)
INSERT [dbo].[Majors] ([Id], [Name], [Description], [DepartmentId], [isSet]) VALUES (20, N'Tiếng Anh giảng dạy (TESOL)', NULL, 3, 0)
SET IDENTITY_INSERT [dbo].[Majors] OFF
GO
SET IDENTITY_INSERT [dbo].[Schedules] ON 

INSERT [dbo].[Schedules] ([Id], [DayOfWeek], [TimeStart], [TimeEnd], [SectionId]) VALUES (16, 2, CAST(N'07:00:00' AS Time), CAST(N'09:00:00' AS Time), 4)
INSERT [dbo].[Schedules] ([Id], [DayOfWeek], [TimeStart], [TimeEnd], [SectionId]) VALUES (18, 3, CAST(N'07:00:00' AS Time), CAST(N'09:00:00' AS Time), 4)
INSERT [dbo].[Schedules] ([Id], [DayOfWeek], [TimeStart], [TimeEnd], [SectionId]) VALUES (19, 5, CAST(N'13:00:00' AS Time), CAST(N'17:00:00' AS Time), 4)
INSERT [dbo].[Schedules] ([Id], [DayOfWeek], [TimeStart], [TimeEnd], [SectionId]) VALUES (23, 8, CAST(N'00:00:00' AS Time), CAST(N'05:00:00' AS Time), 8)
INSERT [dbo].[Schedules] ([Id], [DayOfWeek], [TimeStart], [TimeEnd], [SectionId]) VALUES (24, 5, CAST(N'02:00:00' AS Time), CAST(N'07:00:00' AS Time), 9)
SET IDENTITY_INSERT [dbo].[Schedules] OFF
GO
SET IDENTITY_INSERT [dbo].[Sections] ON 

INSERT [dbo].[Sections] ([Id], [SemesterId], [SubjectId], [Character], [StartDate], [EndDate]) VALUES (4, 1, 14, N'B', CAST(N'2024-11-26T17:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2025-01-21T00:00:00.0000000+07:00' AS DateTimeOffset))
INSERT [dbo].[Sections] ([Id], [SemesterId], [SubjectId], [Character], [StartDate], [EndDate]) VALUES (8, 3, 3, N'B', CAST(N'2024-11-14T17:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2025-01-25T00:00:00.0000000+00:00' AS DateTimeOffset))
INSERT [dbo].[Sections] ([Id], [SemesterId], [SubjectId], [Character], [StartDate], [EndDate]) VALUES (9, 2, 2, N'A', CAST(N'2024-11-26T00:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2025-01-26T00:00:00.0000000+00:00' AS DateTimeOffset))
INSERT [dbo].[Sections] ([Id], [SemesterId], [SubjectId], [Character], [StartDate], [EndDate]) VALUES (12, 1, 7, N'B', CAST(N'2024-11-25T17:00:00.0000000+00:00' AS DateTimeOffset), CAST(N'2024-12-25T17:00:00.0000000+00:00' AS DateTimeOffset))
INSERT [dbo].[Sections] ([Id], [SemesterId], [SubjectId], [Character], [StartDate], [EndDate]) VALUES (13, 1, 14, N'A', CAST(N'2024-11-28T00:00:00.0000000+07:00' AS DateTimeOffset), CAST(N'2025-03-28T00:00:00.0000000+07:00' AS DateTimeOffset))
SET IDENTITY_INSERT [dbo].[Sections] OFF
GO
SET IDENTITY_INSERT [dbo].[Semesters] ON 

INSERT [dbo].[Semesters] ([Id], [Name], [AcademicYear]) VALUES (1, N'1', N'2024')
INSERT [dbo].[Semesters] ([Id], [Name], [AcademicYear]) VALUES (2, N'2', N'2024')
INSERT [dbo].[Semesters] ([Id], [Name], [AcademicYear]) VALUES (3, N'Hè', N'2024')
INSERT [dbo].[Semesters] ([Id], [Name], [AcademicYear]) VALUES (4, N'1', N'2023')
INSERT [dbo].[Semesters] ([Id], [Name], [AcademicYear]) VALUES (5, N'2', N'2023')
INSERT [dbo].[Semesters] ([Id], [Name], [AcademicYear]) VALUES (6, N'Hè', N'2023')
INSERT [dbo].[Semesters] ([Id], [Name], [AcademicYear]) VALUES (7, N'1', N'2025')
INSERT [dbo].[Semesters] ([Id], [Name], [AcademicYear]) VALUES (8, N'2', N'2025')
INSERT [dbo].[Semesters] ([Id], [Name], [AcademicYear]) VALUES (9, N'Hè', N'2025')
SET IDENTITY_INSERT [dbo].[Semesters] OFF
GO
SET IDENTITY_INSERT [dbo].[Subjects] ON 

INSERT [dbo].[Subjects] ([Id], [Name], [Code], [CreditHours], [DepartmentId]) VALUES (2, N'Toán rời rạc', N'DM', 3, 1)
INSERT [dbo].[Subjects] ([Id], [Name], [Code], [CreditHours], [DepartmentId]) VALUES (3, N'Cấu trúc Dữ liệu và Giải thuật', N'DSA', 3, 1)
INSERT [dbo].[Subjects] ([Id], [Name], [Code], [CreditHours], [DepartmentId]) VALUES (6, N'Lập trình Cơ bản', N'BP', 3, 1)
INSERT [dbo].[Subjects] ([Id], [Name], [Code], [CreditHours], [DepartmentId]) VALUES (7, N'Hệ thống Máy tính', N'CS', 1, 1)
INSERT [dbo].[Subjects] ([Id], [Name], [Code], [CreditHours], [DepartmentId]) VALUES (8, N'Nguyên lý Hệ điều hành', N'OSP', 2, 1)
INSERT [dbo].[Subjects] ([Id], [Name], [Code], [CreditHours], [DepartmentId]) VALUES (9, N'Mạng Máy tính', N'CN', 1, 1)
INSERT [dbo].[Subjects] ([Id], [Name], [Code], [CreditHours], [DepartmentId]) VALUES (10, N'Ngữ âm và Âm vị học', N'PP', 1, 3)
INSERT [dbo].[Subjects] ([Id], [Name], [Code], [CreditHours], [DepartmentId]) VALUES (11, N'Ngữ pháp Tiếng Anh', N'EG', 1, 3)
INSERT [dbo].[Subjects] ([Id], [Name], [Code], [CreditHours], [DepartmentId]) VALUES (12, N'Văn hóa các Nước nói Tiếng Anh', N'CoFSC', 3, 3)
INSERT [dbo].[Subjects] ([Id], [Name], [Code], [CreditHours], [DepartmentId]) VALUES (13, N'Dẫn luận Ngôn ngữ học', N'Etl', 3, 3)
INSERT [dbo].[Subjects] ([Id], [Name], [Code], [CreditHours], [DepartmentId]) VALUES (14, N'Tổng quan về Du lịch', N'TO', 1, 2)
INSERT [dbo].[Subjects] ([Id], [Name], [Code], [CreditHours], [DepartmentId]) VALUES (15, N'Kinh tế Du lịch', N'TE', 3, 2)
INSERT [dbo].[Subjects] ([Id], [Name], [Code], [CreditHours], [DepartmentId]) VALUES (16, N'Văn hóa và Du lịch Việt Nam', N'VCT', 1, 2)
INSERT [dbo].[Subjects] ([Id], [Name], [Code], [CreditHours], [DepartmentId]) VALUES (17, N'Địa lý Du lịch', N'TG', 1, 2)
INSERT [dbo].[Subjects] ([Id], [Name], [Code], [CreditHours], [DepartmentId]) VALUES (18, N'Marketing Du lịch', N'TM', 3, 2)
INSERT [dbo].[Subjects] ([Id], [Name], [Code], [CreditHours], [DepartmentId]) VALUES (19, N'Lịch sử Văn hóa Thế giới', N'WCH', 3, 2)
SET IDENTITY_INSERT [dbo].[Subjects] OFF
GO
ALTER TABLE [dbo].[Sections] ADD  DEFAULT (N'') FOR [Character]
GO
ALTER TABLE [dbo].[Subjects] ADD  DEFAULT (N'') FOR [Code]
GO
ALTER TABLE [dbo].[AspNetRoleClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetRoleClaims] CHECK CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUsers]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUsers_Classes_ClassId] FOREIGN KEY([ClassId])
REFERENCES [dbo].[Classes] ([Id])
GO
ALTER TABLE [dbo].[AspNetUsers] CHECK CONSTRAINT [FK_AspNetUsers_Classes_ClassId]
GO
ALTER TABLE [dbo].[AspNetUsers]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUsers_Departments_DepartmentId] FOREIGN KEY([DepartmentId])
REFERENCES [dbo].[Departments] ([Id])
GO
ALTER TABLE [dbo].[AspNetUsers] CHECK CONSTRAINT [FK_AspNetUsers_Departments_DepartmentId]
GO
ALTER TABLE [dbo].[AspNetUsers]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUsers_Majors_MajorId] FOREIGN KEY([MajorId])
REFERENCES [dbo].[Majors] ([Id])
GO
ALTER TABLE [dbo].[AspNetUsers] CHECK CONSTRAINT [FK_AspNetUsers_Majors_MajorId]
GO
ALTER TABLE [dbo].[AspNetUserTokens]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserTokens] CHECK CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[Classes]  WITH CHECK ADD  CONSTRAINT [FK_Classes_Courses_CourseId] FOREIGN KEY([CourseId])
REFERENCES [dbo].[Courses] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Classes] CHECK CONSTRAINT [FK_Classes_Courses_CourseId]
GO
ALTER TABLE [dbo].[Classes]  WITH CHECK ADD  CONSTRAINT [FK_Classes_Departments_DepartmentId] FOREIGN KEY([DepartmentId])
REFERENCES [dbo].[Departments] ([Id])
GO
ALTER TABLE [dbo].[Classes] CHECK CONSTRAINT [FK_Classes_Departments_DepartmentId]
GO
ALTER TABLE [dbo].[Grade]  WITH CHECK ADD  CONSTRAINT [FK_Grade_AspNetUsers_AppUserId] FOREIGN KEY([AppUserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[Grade] CHECK CONSTRAINT [FK_Grade_AspNetUsers_AppUserId]
GO
ALTER TABLE [dbo].[Grade]  WITH CHECK ADD  CONSTRAINT [FK_Grade_Sections_SectionId] FOREIGN KEY([SectionId])
REFERENCES [dbo].[Sections] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Grade] CHECK CONSTRAINT [FK_Grade_Sections_SectionId]
GO
ALTER TABLE [dbo].[Majors]  WITH CHECK ADD  CONSTRAINT [FK_Majors_Departments_DepartmentId] FOREIGN KEY([DepartmentId])
REFERENCES [dbo].[Departments] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Majors] CHECK CONSTRAINT [FK_Majors_Departments_DepartmentId]
GO
ALTER TABLE [dbo].[Schedules]  WITH CHECK ADD  CONSTRAINT [FK_Schedules_Sections_SectionId] FOREIGN KEY([SectionId])
REFERENCES [dbo].[Sections] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Schedules] CHECK CONSTRAINT [FK_Schedules_Sections_SectionId]
GO
ALTER TABLE [dbo].[Sections]  WITH CHECK ADD  CONSTRAINT [FK_Sections_Semesters_SemesterId] FOREIGN KEY([SemesterId])
REFERENCES [dbo].[Semesters] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Sections] CHECK CONSTRAINT [FK_Sections_Semesters_SemesterId]
GO
ALTER TABLE [dbo].[Sections]  WITH CHECK ADD  CONSTRAINT [FK_Sections_Subjects_SubjectId] FOREIGN KEY([SubjectId])
REFERENCES [dbo].[Subjects] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Sections] CHECK CONSTRAINT [FK_Sections_Subjects_SubjectId]
GO
ALTER TABLE [dbo].[Subjects]  WITH CHECK ADD  CONSTRAINT [FK_Subjects_Departments_DepartmentId] FOREIGN KEY([DepartmentId])
REFERENCES [dbo].[Departments] ([Id])
GO
ALTER TABLE [dbo].[Subjects] CHECK CONSTRAINT [FK_Subjects_Departments_DepartmentId]
GO
