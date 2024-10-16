import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSectionGradientBackground() {
  return (
    <div className="min-h-screen mx-auto">
      {/* Hero */}
      <div className="relative overflow-hidden py-24 lg:py-32 w-full flex justify-center items-center">
        {/* Gradients */}
        <div
          aria-hidden="true"
          className="flex flex-col absolute -top-96 start-1/2 transform -translate-x-1/2"
        >
          <div className="bg-gradient-to-r from-background/50 to-background blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]" />
          <div className="bg-gradient-to-tl blur-3xl w-[90rem] h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem] from-primary-foreground via-primary-foreground to-background" />
        </div>
        {/* End Gradients */}
        <div className="relative z-10 min-h-screen flex flex-col items-center">
          <div className="container py-10 lg:py-16">
            <div className="max-w-2xl text-center mx-auto">
              <p className="">Find libraries for your web applications</p>
              {/* Title */}
              <div className="mt-5 max-w-2xl">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  Find Library
                </h1>
              </div>
              {/* End Title */}
              <div className="mt-5 max-w-3xl">
                <p className="text-xl text-muted-foreground">
                  Find libraries easily for your web applications. We have a
                  wide range of libraries for you to choose from.
                </p>
              </div>
              {/* Buttons */}
              <div className="mt-8 gap-3 flex justify-center">
                <Link href="/libs">
                  <Button size={"lg"}>Search For a Lib</Button>
                </Link>
                <Link href="/add-library">
                  <Button size={"lg"} variant={"outline"}>
                    Add a Lib
                  </Button>
                </Link>
              </div>
              {/* End Buttons */}
            </div>
          </div>
          <span className="text-9xl">🕵️</span>
        </div>
      </div>
      {/* End Hero */}
    </div>
  );
}
