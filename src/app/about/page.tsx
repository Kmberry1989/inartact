import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8">About the Project</h1>

                    <div className="prose dark:prose-invert max-w-none">
                        <p className="text-xl text-muted-foreground mb-6">
                            The Indiana Art Activist Inventory is a living archive documenting the intersection of creative expression and social justice across the Hoosier state.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
                        <p className="mb-4">
                            We believe that art is not just a reflection of society, but a tool for shaping it. From the WPA murals of the 1930s to the Black Lives Matter street paintings of 2020, Indiana artists have long used their work to advocate for labor rights, racial justice, gender equality, and environmental stewardship.
                        </p>
                        <p className="mb-6">
                            This project aims to map these contributions, ensuring that the history of activist art in Indiana is preserved, celebrated, and accessible to all.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">How to Use This Archive</h2>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                            <li><strong>Explore the Map:</strong> Visualize the geographic spread of art activism.</li>
                            <li><strong>Browse the Timeline:</strong> See how artistic movements align with historical events.</li>
                            <li><strong>Create a Zine:</strong> Curate your own collection of artists and print a custom zine.</li>
                        </ul>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
