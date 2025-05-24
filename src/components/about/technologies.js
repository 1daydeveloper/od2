import React from "react";
import { technologies } from "@/components/common";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

const Technologies = () => {
  return (
    <Card className="min-h-screen border-card_border">
      <CardContent className="px-3">
        <CardHeader className="text-center py-5">
          <CardTitle>Technologies We Are Experienced In</CardTitle>
        </CardHeader>
        {technologies.map((section) => (
          <Card key={section.category} className="mb-12 shadow-none border-none">
            <CardHeader>
              <CardTitle className="mb-6">{section.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.frameworks.map((framework) => (
                  <Card
                    key={framework.name}
                    id={"techa-" + framework.name}
                    className="hover:shadow-xl transition-shadow"
                  >
                    <CardHeader className="flex flex-row items-center mb-0  rounded-lg p-3">
                      {framework.icon &&
                        React.cloneElement(framework.icon, {
                          className: "w-6 h-6",
                        })}
                      <CardTitle asChild>
                        <span className="text-lg font-bold ml-4">
                          <a
                            href={framework.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {framework.name}
                          </a>
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        <span className="mb-2 block">
                          <strong>Use:</strong> {framework.description}
                        </span>
                        <span className="mb-2 block">
                          <strong>Language:</strong> {framework.language}
                        </span>
                        <span>
                          <strong>OS:</strong> {framework.os}
                        </span>
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default Technologies;
