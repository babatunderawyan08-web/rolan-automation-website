"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn } from "@/components/shared/animations";
import { Label } from "@/components/ui/input";
import { Input } from "@/components/ui/input";

export function ROICalculator() {
  const [hours, setHours] = useState(40);
  const [rate, setRate] = useState(50);
  const [automation, setAutomation] = useState(70);

  const monthlySavings = Math.round(hours * 4.33 * rate * (automation / 100));
  const annualSavings = monthlySavings * 12;
  const roi = Math.round((annualSavings / 7500) * 100);

  return (
    <section className="section-padding bg-background-alt">
      <div className="container mx-auto max-w-4xl px-4">
        <SectionHeader
          eyebrow="ROI Calculator"
          title="Calculate your automation ROI"
          subtitle="See how much your business could save with intelligent automation."
        />
        <FadeIn>
          <div className="rounded-2xl border border-border bg-card p-5 card-shadow sm:p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <Label>Manual hours/week</Label>
                <Input type="number" value={hours} onChange={(e) => setHours(Number(e.target.value))} className="mt-2 min-h-11" />
              </div>
              <div>
                <Label>Hourly cost ($)</Label>
                <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="mt-2 min-h-11" />
              </div>
              <div>
                <Label>Automation rate (%)</Label>
                <Input type="number" value={automation} onChange={(e) => setAutomation(Number(e.target.value))} className="mt-2 min-h-11" />
              </div>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-secondary/5 p-4 text-center">
                <p className="text-2xl font-bold text-secondary">${monthlySavings.toLocaleString()}</p>
                <p className="text-sm text-muted">Monthly savings</p>
              </div>
              <div className="rounded-xl bg-accent/5 p-4 text-center">
                <p className="text-2xl font-bold text-accent">${annualSavings.toLocaleString()}</p>
                <p className="text-sm text-muted">Annual savings</p>
              </div>
              <div className="rounded-xl bg-success/5 p-4 text-center">
                <p className="text-2xl font-bold text-success">{roi}%</p>
                <p className="text-sm text-muted">Estimated ROI</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
