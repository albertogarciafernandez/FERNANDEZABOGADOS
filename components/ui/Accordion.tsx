'use client'

import * as RadixAccordion from '@radix-ui/react-accordion'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AccordionItem {
  id: string
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  type?: 'single' | 'multiple'
  defaultValue?: string
  className?: string
}

export function Accordion({ items, type = 'single', defaultValue, className }: AccordionProps) {
  return (
    <RadixAccordion.Root
      type={type as 'single'}
      defaultValue={defaultValue}
      collapsible
      className={cn('space-y-2', className)}
    >
      {items.map((item) => (
        <AccordionItemComponent key={item.id} item={item} />
      ))}
    </RadixAccordion.Root>
  )
}

function AccordionItemComponent({ item }: { item: AccordionItem }) {
  return (
    <RadixAccordion.Item
      value={item.id}
      className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
    >
      <RadixAccordion.Header>
        <RadixAccordion.Trigger className="group flex w-full items-center justify-between px-5 py-4 text-left text-white font-medium focus:outline-none">
          <span className="text-sm leading-relaxed pr-4">{item.question}</span>
          <ChevronDown className="h-4 w-4 shrink-0 text-white/40 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>
      <RadixAccordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
        <p className="px-5 pb-4 text-sm text-white/60 leading-relaxed">{item.answer}</p>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  )
}

export default Accordion
