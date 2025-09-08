"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Mail, Heart } from "lucide-react"
import { motion } from "framer-motion"
import type { ThanksEntry } from "@/lib/types"

interface ThanksGridProps {
  thanksEntries: ThanksEntry[]
}

export function ThanksGrid({ thanksEntries }: ThanksGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  if (thanksEntries.length === 0) {
    return (
      <div className="text-center py-16">
        <Heart className="w-16 h-16 mx-auto mb-6 text-muted-foreground opacity-50" />
        <h3 className="text-xl font-semibold mb-2">Belum ada entri</h3>
        <p className="text-muted-foreground">Entri Thanks To akan muncul di sini</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {thanksEntries.map((entry) => (
        <motion.div key={entry.id} variants={cardVariants}>
          <Card className="glass glass-hover neon-glow border-border/50 group hover:scale-105 transition-all duration-300">
            <CardContent className="p-6 text-center space-y-4">
              {/* Photo */}
              <div className="relative">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center overflow-hidden group-hover:neon-glow transition-all duration-300">
                  {entry.photo_url ? (
                    <img
                      src={entry.photo_url || "/placeholder.svg"}
                      alt={entry.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Heart className="w-10 h-10 text-primary" />
                  )}
                </div>
              </div>

              {/* Name & Role */}
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-balance">{entry.name}</h3>
                <p className="text-sm text-muted-foreground text-balance">{entry.role}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-2">
                {entry.website_url && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="glass border-primary/30 hover:bg-primary/20 hover:text-primary bg-transparent"
                    asChild
                  >
                    <a href={entry.website_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Website
                    </a>
                  </Button>
                )}
                {entry.contact_url && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="glass border-secondary/30 hover:bg-secondary/20 hover:text-secondary bg-transparent"
                    asChild
                  >
                    <a href={entry.contact_url} target="_blank" rel="noopener noreferrer">
                      <Mail className="w-3 h-3 mr-1" />
                      Contact
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
