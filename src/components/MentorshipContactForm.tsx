import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  subject: z
    .string()
    .trim()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must be less than 200 characters"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
  preferredTime: z
    .string()
    .trim()
    .max(200, "Preferred time must be less than 200 characters")
    .optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function MentorshipContactForm() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "Mentorship Request",
      message: "",
      preferredTime: "",
    },
  });

  const createMailtoLink = (data: ContactFormData) => {
    const subject = encodeURIComponent(data.subject);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}${
        data.preferredTime
          ? `\n\nPreferred Time: ${data.preferredTime}`
          : ""
      }`
    );
    return `mailto:priyata.kalra@gmail.com?subject=${subject}&body=${body}`;
  };

  const onSubmit = (data: ContactFormData) => {
    try {
      const mailtoLink = createMailtoLink(data);
      window.location.href = mailtoLink;
      
      toast({
        title: "Opening email client",
        description: "Your default email client will open with the message pre-filled.",
      });

      // Reset form and close dialog after a brief delay
      setTimeout(() => {
        form.reset();
        setOpen(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open email client. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          className="w-full border-border bg-background hover:bg-accent hover:text-accent-foreground transition-all"
        >
          <Mail className="h-5 w-5 mr-2" />
          Send a Message
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light">Contact Priyata</DialogTitle>
          <DialogDescription className="text-base">
            Send a message about mentorship opportunities. Your default email client will open with the message pre-filled.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your full name"
                      {...field}
                      className="bg-background border-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      {...field}
                      className="bg-background border-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="What would you like to discuss?"
                      {...field}
                      className="bg-background border-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell me about your background, interests, and what you'd like to explore in our conversation..."
                      className="min-h-[120px] bg-background border-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Time (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Weekday mornings, CET timezone"
                      {...field}
                      className="bg-background border-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Send Message
              </Button>
            </div>
          </form>
        </Form>

        <p className="text-sm text-muted-foreground text-center pt-4 border-t">
          Or email directly:{" "}
          <a
            href="mailto:priyata.kalra@gmail.com"
            className="text-accent hover:underline"
          >
            priyata.kalra@gmail.com
          </a>
        </p>
      </DialogContent>
    </Dialog>
  );
}
