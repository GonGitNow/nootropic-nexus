import { useState, useCallback } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";

interface NootropicCardProps {
  substanceName: string;
  category: string[];
  benefits: string[];
  potentialIQBoost?: number;
  dosage?: {
    amount: string;
    unit: string;
  };
  doseTiming?: string;
  howToTake?: boolean;
  drugInteractions?: string[];
  sideEffects?: string[];
  moleculeStructure?: string;
  potentialStacks?: string[];
}

interface StackBadgeProps {
  stack: string;
}

const StackBadge = ({ stack }: StackBadgeProps) => {
  const [isClickable, setIsClickable] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [stackData, setStackData] = useState<NootropicCardProps | null>(null);

  // Split into substances and purpose
  const [substancePart, purposePart] = stack.split(" for ");
  const substances = substancePart.split("+").map(s => s.trim());
  
  const checkNootropicExists = useCallback(async (name: string) => {
    try {
      const response = await api.nootropics.getByName(name);
      return response !== null;
    } catch {
      return false;
    }
  }, []);

  const handleClick = useCallback(async (substance: string) => {
    try {
      const data = await api.nootropics.getByName(substance);
      if (data) {
        setStackData(data as NootropicCardProps);
        setDialogOpen(true);
      }
    } catch {
      console.error(`Failed to fetch data for ${substance}`);
    }
  }, []);

  return (
    <div className="flex items-center gap-2">
      {substances.map((substance, index) => (
        <>
          <Badge
            key={substance}
            className={`cursor-pointer hover:bg-primary/90 ${isClickable ? 'bg-primary' : 'bg-secondary'}`}
            onClick={() => handleClick(substance)}
          >
            {substance}
          </Badge>
          {index < substances.length - 1 && <span>+</span>}
        </>
      ))}
      {purposePart && <span className="text-muted-foreground ml-2">for {purposePart}</span>}
      {stackData && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{stackData.substanceName}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-wrap gap-2 mb-4">
              {stackData.category.map((cat) => (
                <Badge key={cat} variant="secondary">
                  {cat}
                </Badge>
              ))}
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Benefits</h4>
                <div className="flex flex-wrap gap-2">
                  {stackData.benefits.map((benefit) => (
                    <Badge key={benefit} variant="outline">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
              {stackData.dosage && (
                <div>
                  <h4 className="font-medium mb-2">Dosage</h4>
                  <p>{stackData.dosage.amount} {stackData.dosage.unit}</p>
                </div>
              )}
              {stackData.doseTiming && (
                <div>
                  <h4 className="font-medium mb-2">Timing</h4>
                  <p>{stackData.doseTiming}</p>
                </div>
              )}
              {stackData.sideEffects && (
                <div>
                  <h4 className="font-medium mb-2">Side Effects</h4>
                  <div className="flex flex-wrap gap-2">
                    {stackData.sideEffects.map((effect) => (
                      <Badge key={effect} variant="destructive">
                        {effect}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

const NootropicDialog = (props: NootropicCardProps) => {
  const {
    substanceName,
    category,
    benefits,
    potentialIQBoost,
    dosage,
    doseTiming,
    howToTake,
    drugInteractions,
    sideEffects,
    moleculeStructure,
    potentialStacks,
  } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-none">
          <DialogTitle>{substanceName}</DialogTitle>
          <div className="flex flex-wrap gap-2">
            {category.map((cat) => (
              <Badge key={cat} variant="secondary">
                {cat}
              </Badge>
            ))}
          </div>
        </DialogHeader>
        <div className="overflow-y-auto pr-6 space-y-6">
          <div>
            <h4 className="font-medium mb-2">Benefits</h4>
            <div className="flex flex-wrap gap-2">
              {benefits.map((benefit) => (
                <Badge key={benefit} variant="outline">
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>

          {potentialIQBoost && (
            <div>
              <h4 className="font-medium mb-2">Potential IQ Boost</h4>
              <p>{potentialIQBoost}%</p>
            </div>
          )}

          {dosage && (
            <div>
              <h4 className="font-medium mb-2">Dosage</h4>
              <p>{dosage.amount} {dosage.unit}</p>
            </div>
          )}

          {doseTiming && (
            <div>
              <h4 className="font-medium mb-2">Timing</h4>
              <p>{doseTiming}</p>
            </div>
          )}

          {drugInteractions && drugInteractions.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Drug Interactions</h4>
              <div className="flex flex-wrap gap-2">
                {drugInteractions.map((interaction) => (
                  <Badge key={interaction} variant="destructive">
                    {interaction}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {sideEffects && sideEffects.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Side Effects</h4>
              <div className="flex flex-wrap gap-2">
                {sideEffects.map((effect) => (
                  <Badge key={effect} variant="destructive">
                    {effect}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {moleculeStructure && (
            <div>
              <h4 className="font-medium mb-2">Molecule Structure</h4>
              <p>{moleculeStructure}</p>
            </div>
          )}

          {potentialStacks && potentialStacks.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Potential Stacks</h4>
              <div className="flex flex-col gap-2">
                {potentialStacks.map((stack) => (
                  <StackBadge key={stack} stack={stack} />
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const NootropicCard = (props: NootropicCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.substanceName}</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {props.category.map((cat) => (
            <Badge key={cat} variant="secondary">
              {cat}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {props.benefits.slice(0, 3).map((benefit) => (
            <Badge key={benefit} variant="outline">
              {benefit}
            </Badge>
          ))}
          {props.benefits.length > 3 && (
            <Badge variant="outline">+{props.benefits.length - 3} more</Badge>
          )}
        </div>
        <NootropicDialog {...props} />
      </CardHeader>
    </Card>
  );
};