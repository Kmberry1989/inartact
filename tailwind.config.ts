import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
```

6.  **Create the `src` directory structure** and populate it with the files I provided in the previous response. Ensure the file paths match exactly:
    * `src/app/globals.css` (Must include Tailwind directives)
    * `src/app/layout.tsx`
    * `src/app/page.tsx`
    * `src/app/artists/[id]/page.tsx`
    * `src/app/artists/[id]/artist-profile.tsx`
    * `src/components/header.tsx`
    * `src/components/footer.tsx`
    * `src/components/artist-card.tsx`
    * `src/components/artist-gallery.tsx`
    * `src/lib/artists-data.ts` (The one I just generated with 33 artists)
    * `src/lib/types.ts`
    * `src/lib/utils.ts`
    * `src/components/ui/` (Add the UI components: button, card, badge, separator)

    **Essential content for `src/app/globals.css`:**
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    @layer base {
      :root {
        --background: 0 0% 100%;
        --foreground: 222.2 84% 4.9%;
        --card: 0 0% 100%;
        --card-foreground: 222.2 84% 4.9%;
        --popover: 0 0% 100%;
        --popover-foreground: 222.2 84% 4.9%;
        --primary: 222.2 47.4% 11.2%;
        --primary-foreground: 210 40% 98%;
        --secondary: 210 40% 96.1%;
        --secondary-foreground: 222.2 47.4% 11.2%;
        --muted: 210 40% 96.1%;
        --muted-foreground: 215.4 16.3% 46.9%;
        --accent: 210 40% 96.1%;
        --accent-foreground: 222.2 47.4% 11.2%;
        --destructive: 0 84.2% 60.2%;
        --destructive-foreground: 210 40% 98%;
        --border: 214.3 31.8% 91.4%;
        --input: 214.3 31.8% 91.4%;
        --ring: 222.2 84% 4.9%;
        --radius: 0.5rem;
      }
    
      .dark {
        --background: 222.2 84% 4.9%;
        --foreground: 210 40% 98%;
        /* Add other dark mode variables if needed */
      }
    }
    
    @layer base {
      * {
        @apply border-border;
      }
      body {
        @apply bg-background text-foreground;
      }
    }
    ```

### Step 3: Push this NEW structure to GitHub

1.  Delete the `.git` folder in your current directory if you are re-using the folder, or just start in the new clean folder.
2.  Run the following commands in your terminal (in the root of your new folder):

```bash
git init
git add .
git commit -m "Re-structuring for Vercel deployment"
# Make sure you are pushing to your repository
git remote add origin https://github.com/roelberry/iad.git 
# OR if the remote already exists from your previous attempt:
# git remote set-url origin https://github.com/roelberry/iad.git

# Force push to overwrite the broken Firebase structure with the correct one
git push -u origin main --force