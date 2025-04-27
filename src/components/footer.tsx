

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © 2025 Vocal-Mind. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Terms
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}

