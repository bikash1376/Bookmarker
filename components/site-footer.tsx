export function SiteFooter() {
    return (
        <footer className="py-6 md:px-8 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row w-full max-w-4xl mx-auto px-4">
                <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Created by{" "}
                    <a
                        href="https://github.com/bikash1376/bookmarker"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4 cursor-pointer"
                    >
                        Bikash
                    </a>
                    .
                </p>
            </div>
        </footer>
    )
}
