# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

This is a **Frontend Interview Task** for building an employee management CRUD application in React. The application connects to a remote backend API at **https://interview.hyperplane.hu** for authentication and employee data operations.

**API Documentation**: https://interview.hyperplane.hu/swagger/index.html

**Scope**: Only use the **Employee** and **Authentication** sections from the API (User section is not needed).

## Development Commands

```bash
# Install dependencies
pnpm install

# Development server (runs on port 3000)
pnpm dev

# Production build
pnpm build

# Preview production build
pnpm serve

# Testing
pnpm test              # Run all tests with Vitest

```

## Tech Stack (Required)

- **Framework**: React 18+ with Vite
- **UI Components**: Headless UI + shadcn/ui
- **Icons**: lucide-react
- **Styling**: Tailwind CSS (use TailwindUI blocks for inspiration: https://tailwindcss.com/plus/ui-blocks/marketing)
- **Routing**: @tanstack/react-router (file-based routing)
- **Data Fetching**: axios + @tanstack/react-query
- **Tables**: @tanstack/react-table
- **Forms & Validation**: react-hook-form + zod
- **Internationalization**: i18next
- **Date Management**: date-fns
- **Linting/Formatting**: Biome (tabs, double quotes)
- **TypeScript**: Strict mode enabled

### shadcn/ui Components Used
**IMPORTANT**: Whenever you install a new shadcn/ui component, add it to this list with a brief description of its usage.

- **Button**: Used throughout the application for actions and navigation
- **Pagination**: Used for table pagination with Previous/Next controls and page numbers

## Employee Data Model

### Core Fields
- **Id**: Employee identifier
- **Email**: Unique email address (one per employee)
- **FirstName**, **LastName**
- **DateOfBirth**, **PlaceOfBirth**
- **MothersFirstName**, **MothersLastName**
- **Phone**: Phone number
- **Sex**: 0=Female, 1=Male, 2=Unknown
- **Education**: 0=Elementary, 1=VocationalSchool, 2=ApprenticeshipSchool, 3=VocationalSecondarySchool, 4=HighSchool, 5=College, 6=University, 7=Other

### Address Fields
- **Country**, **ZipCode**, **ParcelNumber**, **City**
- **AdministrativeArea**, **AdministrativeAreaType**
- **HouseNumber**, **Building**, **Staircase**, **Floor**, **Door**

### Payment Fields
- **Salary**: Between 200,000 - 500,000 HUF
- **PaymentMethod**: 0=Transfer, 1=Cash, 2=Dispatch
- **BankAccountNumber**: Required when PaymentMethod = Transfer
- **CashPaymentDay**: Required when PaymentMethod = Cash (day of month)
- **MoneyDispatchAddress**: Required when PaymentMethod = Dispatch

## Feature Requirements

### 1. Authentication
- **Login Page**: Only unprotected route in the application
- **Logout**: Allow user to initiate logout
- **Protection**: All other routes require authentication

### 2. Employee Listing
- Display employees in a table using @tanstack/react-table
- **Pagination**: Support pagination with configurable page size
- **Search/Filter**: Add search input for filtering
- **State Persistence**: Track filters (search, pagination, orderBy) in URL searchParams so state persists across navigation

### 3. Employee Create/Update
- Form for creating and updating employees (react-hook-form + zod)
- Can be in modal or separate routes
- **Form Sections**: Group fields logically (personal info, address, payment)
- **Conditional Payment Fields**:
  - PaymentMethod = Transfer (0): Show **BankAccountNumber** with mask
  - PaymentMethod = Cash (1): Show **CashPaymentDay**
  - PaymentMethod = Dispatch (2): Show **MoneyDispatchAddress**

### 4. Employee Delete
- Add delete action to each table row
- **Confirmation**: Show modal to confirm deletion before executing

### 5. Error Handling
- Handle backend errors (missing employee, duplicate email, etc.)
- Refer to swagger documentation for error IDs
- Display user-friendly error messages

## Optional Features (Nice to Have)

- **OrderBy**: Add column sorting tracked in searchParams
- **Phone Masking**: Create component for phone number masking/handling
- **Address Autocomplete**: Combobox using Mapbox Geocoding API (https://api.mapbox.com/search/geocode/v6/forward)
- **i18n**: Hungarian and English translations with i18next
- **Pre-commit Hooks**: Add linting, formatting, and type checking

## Architecture Guidelines

- **Folder Structure**: Build a scalable folder structure even though app is small
- **Type Safety**: Maintain strict TypeScript type safety throughout
- **TypeScript Convention**: Always use `type` instead of `interface` for type definitions
- **Commit History**: Keep organized, meaningful commit history
- **UI Design**: Use TailwindUI as inspiration for building UI components

## Deployment

- **Required**: Share repository for code review
- **Nice to Have**: Deploy to Vercel or similar platform for easy showcasing





