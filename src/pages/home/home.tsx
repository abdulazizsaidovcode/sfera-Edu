import BlurFade from "@/components/magicui/blur-fade"
import { DATA } from "../data/home";
import { HackathonCard } from "@/components/custom/cards/homeCard";
import Hero from "@/components/custom/hero";
import Header from "@/components/custom/Header";
import { useState } from "react";

function Home() {
    const [siteBarOpen, setSiteBarOpen] = useState(false);
    const BLUR_FADE_DELAY = 0.04;



    return (
        <>
            <main className="container mx-auto">
                <Header sidebarOpen={siteBarOpen} setSidebarOpen={setSiteBarOpen} />
                <Hero />
                <section className="space-y-12 w-full py-12">
                    <BlurFade delay={BLUR_FADE_DELAY * 13}>
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                                    Hackathons
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    I like building things
                                </h2>
                                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    During my time in university, I attended{" "}
                                    {DATA.length}+ hackathons. People from around the
                                    country would come together and build incredible things in 2-3
                                    days. It was eye-opening to see the endless possibilities
                                    brought to life by a group of motivated and passionate
                                    individuals.
                                </p>
                            </div>
                        </div>
                    </BlurFade>
                    <BlurFade delay={BLUR_FADE_DELAY * 14}>
                        <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
                            {DATA.map((project, id) => (
                                <BlurFade
                                    key={project.title + project.dates}
                                    delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                                >
                                    <HackathonCard
                                        title={project.title}
                                        description={project.description}
                                        location={project.location}
                                        dates={project.dates}
                                        image={project.image}
                                        links={project.links}
                                    />
                                </BlurFade>
                            ))}
                        </ul>
                    </BlurFade>
                </section>
            </main>
        </>
    )
}

export default Home