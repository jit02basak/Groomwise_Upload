import { SKIN_PROBLEMS, buildRoutine } from './src/data/skincare.js';
import fs from 'fs';
import path from 'path';

// Extract taxonomy
const skinTypes = SKIN_PROBLEMS.filter(p => p.axis === 'type').map(p => p.id);
const concerns = SKIN_PROBLEMS.filter(p => p.axis === 'concern').map(p => p.id);

// Product forms to check
const PRODUCT_FORMS = [
  'serum', 'toner', 'cleanser', 'treatment', 'gel', 'cream', 
  'moisturizer', 'sunscreen', 'mask', 'product', 'shampoo', 
  'wash', 'spf', 'fluid', 'lotion', 'milk', 'oil'
];

function getBracketText(productString) {
  const idx = productString.indexOf('(');
  if (idx !== -1) {
    let bracketContent = productString.slice(idx + 1);
    if (bracketContent.endsWith(')')) {
      bracketContent = bracketContent.slice(0, -1);
    }
    if (bracketContent.startsWith('look for:')) {
      bracketContent = bracketContent.slice('look for:'.length).trim();
    }
    return bracketContent;
  }
  return productString;
}

function hasProductForm(bracketText) {
  const lower = bracketText.toLowerCase();
  return PRODUCT_FORMS.some(form => lower.includes(form));
}

// Generate all combinations
const combinations = [];

// 1. Single concerns: 4 types * 14 concerns = 56 combinations
for (const type of skinTypes) {
  for (const concern of concerns) {
    combinations.push({
      type,
      concerns: [concern]
    });
  }
}

// 2. Pairwise concerns (ordered): 4 types * 14 concerns * 13 other concerns = 728 combinations
for (const type of skinTypes) {
  for (let i = 0; i < concerns.length; i++) {
    for (let j = 0; j < concerns.length; j++) {
      if (i === j) continue;
      combinations.push({
        type,
        concerns: [concerns[i], concerns[j]]
      });
    }
  }
}

console.log(`Generated ${combinations.length} combinations to audit.`);

const auditedResults = [];

for (const combo of combinations) {
  const quizResult = {
    skinType: { primary: combo.type, modifier: null },
    concerns: combo.concerns.map(id => ({ id })),
    lowSignalConcern: false
  };

  const routine = buildRoutine(quizResult);

  // Flags evaluation
  const amTreatCount = routine.am.filter(s => s.step === 'Treat').length;
  const pmTreatCount = routine.pm.filter(s => s.step === 'Treat').length;
  const hasMultipleTreatAM = amTreatCount > 1;
  const hasMultipleTreatPM = pmTreatCount > 1;

  const flags = [];
  if (hasMultipleTreatAM) {
    flags.push(`⚠️ 2+ treatment steps in Day routine (${amTreatCount} steps)`);
  }
  if (hasMultipleTreatPM) {
    flags.push(`⚠️ 2+ treatment steps in Night routine (${pmTreatCount} steps)`);
  }

  const missingFormSteps = [];
  for (const step of [...routine.am, ...routine.pm]) {
    const bracketText = getBracketText(step.product);
    if (!hasProductForm(bracketText)) {
      flags.push(`⚠️ missing product form in ${step.step} step ("${bracketText}")`);
      missingFormSteps.push({ step: step.step, bracketText });
    }
  }

  const result = {
    type: combo.type,
    concerns: combo.concerns,
    label: routine.label,
    routine,
    flags,
    isFlagged: flags.length > 0,
    amTreatCount,
    pmTreatCount,
    missingFormSteps
  };

  auditedResults.push(result);
}

// Separate flagged and non-flagged
const flaggedResults = auditedResults.filter(r => r.isFlagged);
console.log(`Audited ${auditedResults.length} routines. Flagged: ${flaggedResults.length}`);

// Generate Markdown
let md = `# Skincare Routine Audit Report

Generated on: ${new Date().toISOString()}
Total combinations audited: **${auditedResults.length}**
Total flagged combinations: **${flaggedResults.length}**

This developer-only audit report evaluates the skincare routine outputs across the entire system.
It flags two issues:
1. Rountines containing **2+ TREAT steps** in Day (AM) or Night (PM) routines.
2. Steps whose bracket text is a **bare ingredient name** with no product form (e.g. serum, cream, cleanser).

---

## 🚩 Flagged Combinations Summary

There are **${flaggedResults.length}** combinations that triggered audit flags.

`;

flaggedResults.forEach((r, idx) => {
  const nameLabel = r.concerns.length === 1 
    ? `${r.type} + ${r.concerns[0]}` 
    : `${r.type} + ${r.concerns[0]} + ${r.concerns[1]}`;

  md += `### ${idx + 1}. Combination: ${nameLabel}\n`;
  md += `- **Skin Type**: \`${r.type}\`\n`;
  md += `- **Concerns**: ${r.concerns.map(c => `\`${c}\``).join(', ')}\n`;
  md += `- **Routine Label**: *${r.label}*\n`;
  md += `- **Flags**:\n`;
  r.flags.forEach(f => {
    md += `  - ${f}\n`;
  });
  md += `- **Day Routine (AM)**:\n`;
  r.routine.am.forEach((step, i) => {
    md += `  ${i + 1}. **${step.step}**: ${step.product}\n`;
  });
  md += `- **Night Routine (PM)**:\n`;
  r.routine.pm.forEach((step, i) => {
    md += `  ${i + 1}. **${step.step}**: ${step.product}\n`;
  });
  md += `\n---\n\n`;
});

md += `## 📖 Appendix: All Audited Combinations

Below is the complete output for all **${auditedResults.length}** audited combinations.

`;

auditedResults.forEach((r, idx) => {
  const nameLabel = r.concerns.length === 1 
    ? `${r.type} + ${r.concerns[0]}` 
    : `${r.type} + ${r.concerns[0]} + ${r.concerns[1]}`;

  md += `### [${idx + 1}] ${nameLabel}\n`;
  md += `- **Skin Type**: \`${r.type}\`\n`;
  md += `- **Concerns**: ${r.concerns.map(c => `\`${c}\``).join(', ')}\n`;
  md += `- **Routine Label**: *${r.label}*\n`;
  if (r.isFlagged) {
    md += `- **Flags**:\n`;
    r.flags.forEach(f => {
      md += `  - ${f}\n`;
    });
  } else {
    md += `- **Flags**: None ✅\n`;
  }
  md += `- **Day Routine (AM)**:\n`;
  r.routine.am.forEach((step, i) => {
    md += `  ${i + 1}. **${step.step}**: ${step.product}\n`;
  });
  md += `- **Night Routine (PM)**:\n`;
  r.routine.pm.forEach((step, i) => {
    md += `  ${i + 1}. **${step.step}**: ${step.product}\n`;
  });
  md += `\n`;
});

// Paths to save
const reportPath = path.resolve('routine_audit_report.md');
const artifactDir = 'C:\\Users\\Jit Basak\\.gemini\\antigravity-ide\\brain\\112eddd6-a49e-4992-ab4a-d54ebaac8648';
const artifactReportPath = path.join(artifactDir, 'routine_audit_report.md');

fs.writeFileSync(reportPath, md, 'utf-8');
console.log(`Saved report to ${reportPath}`);

if (fs.existsSync(artifactDir)) {
  fs.writeFileSync(artifactReportPath, md, 'utf-8');
  console.log(`Saved report to artifact path: ${artifactReportPath}`);
} else {
  console.log(`Artifact path not found: ${artifactDir}`);
}
