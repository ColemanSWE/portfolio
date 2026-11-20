'use client';

import { Fragment, useState } from 'react';
import type { Job } from '../../lib/portfolio-data';

export default function ExperienceTable({ jobs }: { jobs: Job[] }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <table>
      <thead>
        <tr>
          <th>When</th>
          <th>Where</th>
          <th>Role</th>
          <th aria-hidden="true" />
        </tr>
      </thead>
      <tbody>
        {jobs.map((job, i) => {
          const isOpen = open.has(i);
          return (
            <Fragment key={job.company}>
              <tr
                className="job"
                tabIndex={0}
                aria-expanded={isOpen}
                onClick={() => toggle(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle(i);
                  }
                }}
              >
                <td className="when">{job.dates}</td>
                <td className="co">
                  <b>{job.company}</b>
                  {job.location}
                </td>
                <td>{job.role}</td>
                <td className="arrow">{isOpen ? '−' : '+'}</td>
              </tr>
              {isOpen && (
                <tr className="more">
                  <td colSpan={4}>
                    <ul>
                      {job.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    <div className="tg">{job.tech.join(' · ')}</div>
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
