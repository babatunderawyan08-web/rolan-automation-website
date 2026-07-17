"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  company: z.string().optional(),
  message: z.string().min(10, "Please provide more details"),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("Contact:", data);
    setStatus("success");
    reset();
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" placeholder="John Smith" className="mt-1.5" {...register("name")} />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="john@company.com" className="mt-1.5" {...register("email")} />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="company">Company (optional)</Label>
        <Input id="company" placeholder="Your company" className="mt-1.5" {...register("company")} />
      </div>
      <div>
        <Label htmlFor="message">How can we help?</Label>
        <Textarea id="message" placeholder="Describe your automation needs..." className="mt-1.5" {...register("message")} />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>
      <Button type="submit" variant="accent" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
      {status === "success" && <p className="text-center text-sm text-success">Message sent! We&apos;ll respond within 24 hours.</p>}
    </form>
  );
}
