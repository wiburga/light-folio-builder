import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="py-12 px-4 border-t border-border/50 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full blur-[120px] opacity-5 bg-primary" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center text-muted-foreground">
          <p className="mb-2">
            Diseñado por{" "}
            <span className="text-primary font-semibold text-glow-subtle">
              Isaias Burga
            </span>
          </p>
          <p className="text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
