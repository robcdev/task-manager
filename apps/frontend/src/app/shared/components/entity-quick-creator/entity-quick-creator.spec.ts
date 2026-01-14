import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityQuickCreator } from './entity-quick-creator';

describe('EntityQuickCreator', () => {
  let component: EntityQuickCreator;
  let fixture: ComponentFixture<EntityQuickCreator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityQuickCreator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityQuickCreator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
